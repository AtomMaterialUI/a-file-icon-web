/**
 * Shared helpers for the release tooling.
 *
 * The credentials can come from two places (in priority order):
 *   1. A dotenvx `.env` (flattened vars, see `.env.example`) — the recommended
 *      single source of truth.
 *   2. Legacy loose files `key.json` / `keys.json` in the repo root.
 *
 * These helpers reconstruct the two JSON shapes the tooling needs:
 *   - `key.json`  → consumed by `gcp-refresh-token`
 *   - bpp keys    → the value of the `SUBMIT_KEYS` secret / `bpp` `keys` input
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const ROOT = resolve(import.meta.dir, '..', '..');
export const KEY_JSON = resolve(ROOT, 'key.json');
export const KEYS_JSON = resolve(ROOT, 'keys.json');
export const ENV_FILE = resolve(ROOT, '.env');

const CHROME_SCOPE = 'https://www.googleapis.com/auth/chromewebstore';

export interface KeyJson {
  installed: {
    client_id: string
    project_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_secret: string
    redirect_uris: string[]
  };
  scope: string[];
  chrome?: { clientId: string; clientSecret: string; refreshToken: string };
}

export interface BppKeys {
  $schema: string;
  chrome: {
    clientId: string
    clientSecret: string
    refreshToken: string
    extId: string
  };
  firefox: { apiKey: string; apiSecret: string; extId: string };
  edge: {
    productId: string
    clientId: string
    accessTokenUrl: string
    clientSecret: string
  };
}

/** Load an encrypted/plain dotenvx `.env` into `process.env`, if present. */
export async function loadEnvFile(): Promise<boolean> {
  if (!existsSync(ENV_FILE)) return false;
  const dotenvx = await import('@dotenvx/dotenvx');
  dotenvx.config({ path: ENV_FILE, quiet: true });
  return true;
}

/** True when the flattened credential vars are available in the environment. */
export function hasEnvCredentials(): boolean {
  return Boolean(process.env.GCP_CLIENT_ID || process.env.CHROME_CLIENT_ID);
}

function req(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

/** Return a trimmed env var, or undefined when unset or empty. */
function opt(name: string): string | undefined {
  const value = process.env[name];
  return value?.trim() ? value : undefined;
}

/** Build the `gcp-refresh-token` input from environment variables. */
export function keyJsonFromEnv(): KeyJson {
  const clientId = opt('GCP_CLIENT_ID') ?? req('CHROME_CLIENT_ID');
  const clientSecret = opt('GCP_CLIENT_SECRET') ?? req('CHROME_CLIENT_SECRET');
  return {
    installed: {
      client_id: clientId,
      project_id: req('GCP_PROJECT_ID'),
      auth_uri:
        opt('GCP_AUTH_URI') ?? 'https://accounts.google.com/o/oauth2/auth',
      token_uri: opt('GCP_TOKEN_URI') ?? 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url:
        opt('GCP_AUTH_PROVIDER_CERT_URL') ??
        'https://www.googleapis.com/oauth2/v1/certs',
      client_secret: clientSecret,
      redirect_uris: (opt('GCP_REDIRECT_URIS') ?? 'http://localhost')
        .split(',')
        .map((s) => s.trim()),
    },
    scope: [CHROME_SCOPE],
    chrome: opt('CHROME_REFRESH_TOKEN')
      ? {
        clientId,
        clientSecret,
        refreshToken: req('CHROME_REFRESH_TOKEN'),
      }
      : undefined,
  };
}

/** Build the bpp keys object (the `SUBMIT_KEYS` value) from environment. */
export function bppKeysFromEnv(): BppKeys {
  return {
    $schema:
      'https://raw.githubusercontent.com/plasmo-corp/bpp/v3/keys.schema.json',
    chrome: {
      clientId: opt('CHROME_CLIENT_ID') ?? req('GCP_CLIENT_ID'),
      clientSecret: opt('CHROME_CLIENT_SECRET') ?? req('GCP_CLIENT_SECRET'),
      refreshToken: req('CHROME_REFRESH_TOKEN'),
      extId: req('CHROME_EXT_ID'),
    },
    firefox: {
      apiKey: req('FIREFOX_API_KEY'),
      apiSecret: req('FIREFOX_API_SECRET'),
      extId: req('FIREFOX_EXT_ID'),
    },
    edge: {
      productId: req('EDGE_PRODUCT_ID'),
      clientId: req('EDGE_CLIENT_ID'),
      accessTokenUrl: req('EDGE_ACCESS_TOKEN_URL'),
      clientSecret: req('EDGE_CLIENT_SECRET'),
    },
  };
}

/** Resolve the bpp keys JSON string, preferring env then legacy keys.json. */
export async function resolveBppKeys(): Promise<string> {
  const usingEnv = await loadEnvFile();
  if (usingEnv && hasEnvCredentials()) {
    return JSON.stringify(bppKeysFromEnv(), null, 2);
  }
  if (existsSync(KEYS_JSON)) {
    return readFileSync(KEYS_JSON, 'utf8');
  }
  throw new Error(
    'No credentials found: expected an encrypted .env (see .env.example) or a keys.json file.',
  );
}
