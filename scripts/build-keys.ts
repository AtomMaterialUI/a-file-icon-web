/**
 * Print the bpp keys JSON (the value of the `SUBMIT_KEYS` secret) to stdout.
 *
 * Sources credentials from an encrypted `.env` (preferred) or legacy
 * `keys.json`. Used by the release script's secret-sync and, in future, by CI
 * (Option B2) to feed `bpp` without a `SUBMIT_KEYS` secret:
 *
 *   dotenvx run -- bun run scripts/build-keys.ts
 */

import { resolveBppKeys } from './lib/keys';

const keys = await resolveBppKeys();
process.stdout.write(keys.endsWith('\n') ? keys : `${keys}\n`);
