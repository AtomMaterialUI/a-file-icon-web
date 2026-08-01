# Releasing Atom Material Icons for Web

This document is the single source of truth for publishing a new version to the Chrome Web Store, Firefox Add-ons, and
Edge Add-ons.

## TL;DR (normal release)

```sh
# working tree must be clean
bun run release patch      # or: minor | major
```

That's it. This command syncs the publish credentials to the `SUBMIT_KEYS`
GitHub secret, bumps the version, pushes the tag, and creates a GitHub release — which triggers the publish workflows.

If a publish later fails with an **auth / token error**, the Chrome refresh token has expired (see below) — re-run with
`--refresh`:

```sh
bun run release patch -- --refresh
```

---

## How publishing works

1. The four workflows in `.github/workflows/submit*.yml` use
   [`PlasmoHQ/bpp`](https://github.com/PlasmoHQ/bpp) to upload the built zips.
2. `bpp` reads all store credentials from a single JSON blob, supplied via the GitHub Actions secret **`SUBMIT_KEYS`**
   (shape: `keys.example.json`).
3. `submit-chrome.yml`, `submit-edge.yml`, `submit-firefox.yml` run on
   `release: published`; `submit.yml` publishes to all browsers and is
   `workflow_dispatch`-only. All can also be triggered manually from the Actions tab.

The only fragile credential is the **Chrome Web Store refresh token**. Firefox and Edge credentials are long-lived.

### Why the Chrome refresh token expires (and when it doesn't)

The token is a Google OAuth refresh token. Its lifetime depends entirely on the GCP OAuth app's **publishing status**:

| OAuth consent-screen status | Refresh-token lifetime                                                                                      |
|-----------------------------|-------------------------------------------------------------------------------------------------------------|
| **Testing**                 | **Expires after 7 days**, always                                                                            |
| **In production**           | Effectively permanent (revoked only by: user revoke, 6 months unused, password change, or >100 tokens/user) |

> **Do this once and stop fighting expiry:** in the Google Cloud Console, set the
> OAuth consent screen to **"In production"**. No Google verification is required
> for our single non-sensitive scope (`.../auth/chromewebstore`). The refresh
> token then stops expiring and `--refresh` becomes a rare recovery step rather
> than a per-release chore.

---

## Credential source of truth

Credentials can live in either of two places. The tooling auto-detects which:

### Recommended: an encrypted `.env` (dotenvx)

One committed, encrypted file is the source of truth; only a private key stays secret. See `.env.example` for every
variable.

First-time setup:

```sh
cp .env.example .env
# fill in the real values (leave CHROME_REFRESH_TOKEN blank — it is minted below)
bunx @dotenvx/dotenvx encrypt      # encrypts .env in place, writes .env.keys
```

- `.env` now contains **encrypted** values and is safe to commit (a maintainer choosing to adopt this can
  `git add -f .env`; it is gitignored by default to prevent accidentally committing a *plaintext* `.env`).
- `.env.keys` holds `DOTENV_PRIVATE_KEY` — **never commit it**. Share it with co-maintainers out of band. (Only needed
  in CI if you later adopt Option B2, below.)

Mint the first Chrome refresh token and sync the secret:

```sh
bun run release patch -- --refresh    # opens a browser for Google OAuth
```

`--refresh` writes the new token back into `.env` (re-encrypted) automatically.

### Legacy: loose `key.json` / `keys.json`

If there is no `.env`, the tooling falls back to the two gitignored files:

- `key.json` — the GCP OAuth client used by `gcp-refresh-token`
  (shape: `key.example.json`).
- `keys.json` — the `bpp` keys blob (shape: `keys.example.json`).

`--refresh` writes the new token into `keys.json` in this mode.

---

## The `bun run release` command

```
bun run release [patch|minor|major] [-- <flags>]
```

| Flag            | Effect                                                                                                                  |
|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| *(none)*        | Clean-tree check → sync `SUBMIT_KEYS` → bump version → push tag → create release.                                       |
| `--refresh`     | First mint a fresh Chrome refresh token (interactive) and persist it, then continue. Use when a publish failed on auth. |
| `--sync-secret` | Only push current credentials to `SUBMIT_KEYS`; no version bump.                                                        |
| `--skip-secret` | Skip the secret sync (secret already current).                                                                          |
| `--dry-run`     | Print each step without changing anything.                                                                              |

Related helper:

```sh
bun run keys:build   # print the bpp keys JSON (what SUBMIT_KEYS holds)
```

Requirements: [`gh`](https://cli.github.com/) authenticated with access to this repo (for `gh secret set`), and
`bun install` already run.

---

## One-time infrastructure setup

1. **GCP project + OAuth client** — follow the
   [Chrome Web Store API guide](https://developer.chrome.com/docs/webstore/using_webstore_api/#enable-cws-api). Download
   the OAuth client JSON. Set the consent screen to **In production**.
2. **Firefox** — create API credentials at
   `addons.mozilla.org` → *Manage API Keys* (`apiKey` / `apiSecret`).
3. **Edge** — create API credentials in Partner Center (`productId`, `clientId`, `clientSecret`, `accessTokenUrl`).
4. Put all values into `.env` (see `.env.example`) and encrypt, **or** into
   `key.json` / `keys.json`.
5. Run `bun run release <bump> -- --refresh` once to mint the Chrome token and populate the `SUBMIT_KEYS` secret.

---

## (Future) Option B2: drop the `SUBMIT_KEYS` secret

Once the encrypted `.env` is the source of truth, CI can build the keys blob itself and the `SUBMIT_KEYS` secret can be
removed. In each `submit*.yml`, replace `keys: ${{ secrets.SUBMIT_KEYS }}` with a step that runs
`dotenvx run -- bun run keys:build` (passing its output to `bpp`), and add
`DOTENV_PRIVATE_KEY` as the only secret. Not yet adopted — B1 above keeps CI unchanged.
