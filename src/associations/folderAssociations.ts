import iconAssociations from '../../public/folder_associations.json';
import type { FolderIconAssociation } from '~associations/types';
import { IconType } from '~associations/types';

type RawFolderIconAssociation = {
  folderNames: string;
  icon: string;
  name: string;
  pattern: string;
  iconType: 'FOLDER';
  priority: string;
  folderColor: string;
  folderIconColor: string;
};

type CompiledFolderIconAssociation = RawFolderIconAssociation & { regex: RegExp };

const DEFAULT: FolderIconAssociation = {
  enabled: true,
  folderNames: '',
  folderColor: '78909C',
  folderIconColor: 'B0BEC5',
  icon: '/default.svg',
  iconType: IconType.FOLDER,
  name: 'Default',
  pattern: /(?:)/,
  priority: 1,
};

// Compile every pattern once at module load. The `^` anchor is stripped to
// mirror the original matching behaviour, and no `g` flag is used so `test`
// stays stateless across calls.
const ASSOCIATIONS: CompiledFolderIconAssociation[] = iconAssociations.associations.associations.regex
  .map((entry) => entry.value as RawFolderIconAssociation)
  .map((value) => ({ ...value, regex: new RegExp(value.pattern.replace('^', '')) }));

const cache = new Map<string, FolderIconAssociation>();

export function clearCache(): void {
  cache.clear();
}

const makeFolderIconAssociation = (json?: RawFolderIconAssociation): FolderIconAssociation => {
  if (!json) {
    return DEFAULT;
  }

  return {
    folderNames: json.folderNames,
    enabled: true,
    icon: json.icon,
    name: json.name,
    pattern: new RegExp(json.pattern),
    iconType: IconType.FOLDER,
    priority: Number.parseInt(json.priority, 10),
    folderIconColor: json.folderIconColor,
    folderColor: json.folderColor,
  };
};

export function getFolderAssociation(name?: string): FolderIconAssociation {
  const key = name?.toLowerCase() ?? '';

  const cached = cache.get(key);
  if (cached) {
    return cached;
  }

  const found = makeFolderIconAssociation(ASSOCIATIONS.find((assoc) => assoc.regex.test(key)));
  cache.set(key, found);
  return found;
}

export function getFolderIconName(assoc: FolderIconAssociation = DEFAULT): string {
  return assoc.icon
    .replace('/', '')
    .replace('.svg', '')
    .replace('-', '_');
}
