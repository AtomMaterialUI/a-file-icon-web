/**
 * One-command release helper.
 *
 *   bun run release [patch|minor|major] [--refresh] [--sync-secret] [--dry-run]
 *
 * Default flow:
 *   1. Refuse to run on a dirty git tree.
 *   2. Sync the `SUBMIT_KEYS` GitHub secret from the credential source of truth.
 *   3. Bump the version (`release:<bump>`), which pushes tags and creates the
 *      GitHub release, triggering the publish workflows.
 *
 * Flags:
 *   --refresh       Mint a fresh Chrome Web Store refresh token first
 *                   (interactive: opens a browser via `gcp-refresh-token`),
 *                   persist it (into `.env` when using dotenvx, else
 *                   `keys.json`), then continue.
 *   --sync-secret   Only push the current credentials to `SUBMIT_KEYS`; no bump.
 *   --dry-run       Print what would happen without mutating anything.
 *   --skip-secret   Skip the secret sync (e.g. secret already up to date).
 */

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { hasEnvCredentials, KEY_JSON, keyJsonFromEnv, KEYS_JSON, loadEnvFile, resolveBppKeys, ROOT } from './lib/keys';

type Bump = 'patch' | 'minor' | 'major'

interface Options {
  bump: Bump;
  refresh: boolean;
  syncSecretOnly: boolean;
  skipSecret: boolean;
  dryRun: boolean;
}

const SECRET_NAME = 'SUBMIT_KEYS';
const ACTIONS_URL = 'https://github.com/AtomMaterialUI/a-file-icon-web/actions';

function parseArgs(argv: string[]): Options {
  const opts: Options = {
    bump: 'patch',
    refresh: false,
    syncSecretOnly: false,
    skipSecret: false,
    dryRun: false,
  };
  for (const arg of argv) {
    switch (arg) {
      case '--':
        break;
      case 'patch':
      case 'minor':
      case 'major':
        opts.bump = arg;
        break;
      case '--refresh':
        opts.refresh = true;
        break;
      case '--sync-secret':
        opts.syncSecretOnly = true;
        break;
      case '--skip-secret':
        opts.skipSecret = true;
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      default:
        fail(`Unknown argument: ${arg}`);
    }
  }
  return opts;
}

function log(msg: string): void {
  console.log(`\x1b[36m›\x1b[0m ${msg}`);
}

function fail(msg: string): never {
  console.error(`\x1b[31m✗ ${msg}\x1b[0m`);
  process.exit(1);
}

function run(cmd: string, args: string[], opts: { input?: string } = {}): void {
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio:
      opts.input === undefined ? 'inherit' : ['pipe', 'inherit', 'inherit'],
    input: opts.input,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    fail(`Command failed: ${cmd} ${args.join(' ')}`);
  }
}

function assertCleanTree(): void {
  const result = spawnSync('git', ['status', '--porcelain'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  if (result.status !== 0) fail('Unable to read git status.');
  if (result.stdout.trim()) {
    fail(
      'Working tree is not clean. Commit or stash your changes before releasing.',
    );
  }
}

function commandExists(cmd: string): boolean {
  return spawnSync('which', [cmd], { encoding: 'utf8' }).status === 0;
}

/** Interactive: mint a new Chrome refresh token and persist it. */
async function refreshToken(usingEnv: boolean, dryRun: boolean): Promise<void> {
  log('Refreshing the Chrome Web Store token (a browser will open)…');
  if (dryRun) {
    log('[dry-run] would run gcp-refresh-token and persist the new token.');
    return;
  }

  // gcp-refresh-token reads ./key.json. When using dotenvx we materialize it
  // from env, preserving any pre-existing key.json to avoid clobbering it.
  let backup: string | undefined;
  let wroteTempKeyJson = false;
  if (usingEnv) {
    if (existsSync(KEY_JSON)) backup = readFileSync(KEY_JSON, 'utf8');
    writeFileSync(KEY_JSON, `${JSON.stringify(keyJsonFromEnv(), null, 2)}\n`);
    wroteTempKeyJson = true;
  } else if (!existsSync(KEY_JSON)) {
    fail(
      'key.json not found and no .env credentials available. See RELEASE.md.',
    );
  }

  await new Promise<void>((resolvePromise) => {
    const child = spawn('gcp-refresh-token', [], {
      cwd: ROOT,
      stdio: 'inherit',
    });
    child.on('exit', (code) => {
      if (code !== 0) fail(`gcp-refresh-token exited with code ${code}.`);
      resolvePromise();
    });
    child.on('error', () =>
      fail(
        'Could not launch gcp-refresh-token. Run `bun install` first (it is a devDependency).',
      ),
    );
  });

  const keyJson = JSON.parse(readFileSync(KEY_JSON, 'utf8'));
  const token: string | undefined = keyJson?.chrome?.refreshToken;
  if (!token) fail('gcp-refresh-token did not write a chrome.refreshToken.');

  if (usingEnv) {
    log('Persisting the new token into .env (re-encrypted via dotenvx)…');
    run('bunx', ['@dotenvx/dotenvx', 'set', 'CHROME_REFRESH_TOKEN', token]);
    // Reload so downstream secret sync sees the new value.
    process.env.CHROME_REFRESH_TOKEN = token;
    if (wroteTempKeyJson) {
      // Restore the original key.json, or remove the temp one we created.
      if (backup !== undefined) writeFileSync(KEY_JSON, backup);
      else spawnSync('rm', ['-f', KEY_JSON], { cwd: ROOT });
    }
  } else {
    log('Persisting the new token into keys.json…');
    if (!existsSync(KEYS_JSON)) {
      fail('keys.json not found. Create it from keys.example.json first.');
    }
    const keys = JSON.parse(readFileSync(KEYS_JSON, 'utf8'));
    keys.chrome = { ...keys.chrome, refreshToken: token };
    writeFileSync(KEYS_JSON, `${JSON.stringify(keys, null, 2)}\n`);
  }
  log('Chrome refresh token updated.');
}

async function syncSecret(dryRun: boolean): Promise<void> {
  if (!commandExists('gh')) {
    fail('GitHub CLI (gh) is required to update the SUBMIT_KEYS secret.');
  }
  const keys = await resolveBppKeys();
  // Validate it parses before shipping it.
  JSON.parse(keys);
  log(`Pushing ${SECRET_NAME} secret…`);
  if (dryRun) {
    log(`[dry-run] would run: gh secret set ${SECRET_NAME} (from stdin)`);
    return;
  }
  run('gh', ['secret', 'set', SECRET_NAME], { input: keys });
  log(`${SECRET_NAME} secret updated.`);
}

async function main(): Promise<void> {
  const opts = parseArgs(process.argv.slice(2));
  const usingEnv = (await loadEnvFile()) && hasEnvCredentials();
  log(
    usingEnv
      ? 'Credential source: encrypted .env (dotenvx).'
      : 'Credential source: legacy key.json / keys.json.',
  );

  if (opts.syncSecretOnly) {
    await syncSecret(opts.dryRun);
    log('Done (secret sync only).');
    return;
  }

  assertCleanTree();

  if (opts.refresh) {
    await refreshToken(usingEnv, opts.dryRun);
  }

  if (!opts.skipSecret) {
    await syncSecret(opts.dryRun);
  }

  log(`Bumping version (${opts.bump}) and creating the release…`);
  if (opts.dryRun) {
    log(`[dry-run] would run: bun run release:${opts.bump}`);
  } else {
    run('bun', ['run', `release:${opts.bump}`]);
  }

  log('Release created. Publish workflows will run here:');
  log(`  ${ACTIONS_URL}`);
}

main().catch((err) => fail(err instanceof Error ? err.message : String(err)));
