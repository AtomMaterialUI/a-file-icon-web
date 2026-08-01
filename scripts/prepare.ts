import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const ROOT = join(import.meta.dir, '..');

type IconSet = {
  /** Source directory holding the `*.svg` files. */
  src: string;
  /** Destination directory for the copied SVGs and generated `index.ts`. */
  dest: string;
  /** Prefix used for the generated export identifiers (e.g. `file` / `folder`). */
  prefix: string;
};

const ICON_SETS: IconSet[] = [
  {
    src: join(ROOT, 'iconGenerator/assets/icons/files'),
    dest: join(ROOT, 'public/icons/files'),
    prefix: 'file',
  },
  {
    src: join(ROOT, 'iconGenerator/assets/icons/folders'),
    dest: join(ROOT, 'public/icons/folders'),
    prefix: 'folder',
  },
];

const ASSETS: Array<{ from: string; to: string }> = [
  {
    from: join(ROOT, 'iconGenerator/icon_associations.json'),
    to: join(ROOT, 'public/icon_associations.json'),
  },
  {
    from: join(ROOT, 'iconGenerator/folder_associations.json'),
    to: join(ROOT, 'public/folder_associations.json'),
  },
  {
    from: join(ROOT, 'assets/global.css'),
    to: join(ROOT, 'public/global.css'),
  },
];

/** Copies every SVG of an icon set and writes an `index.ts` re-exporting them. */
function buildIconSet({ src, dest, prefix }: IconSet): number {
  mkdirSync(dest, { recursive: true });

  const svgs = readdirSync(src)
    .filter((name) => name.endsWith('.svg'))
    .sort();

  const exports = svgs.map((file) => {
    copyFileSync(join(src, file), join(dest, file));

    const name = basename(file, '.svg');
    const identifier = `${prefix}_${name.replaceAll('-', '_')}`;
    return `export * as ${identifier} from 'data-text:./${file}';`;
  });

  writeFileSync(join(dest, 'index.ts'), `${exports.join('\n')}\n`);
  return svgs.length;
}

function copyAssets(): void {
  for (const { from, to } of ASSETS) {
    copyFileSync(from, to);
  }
}

for (const set of ICON_SETS) {
  const count = buildIconSet(set);
  console.log(`Prepared ${count} ${set.prefix} icons -> ${set.dest}`);
}

copyAssets();
console.log(`Copied ${ASSETS.length} assets -> public/`);
