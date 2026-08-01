import iconAssociations from '../../public/icon_associations.json';
import type { FileIconAssociation } from '~associations/types';
import { IconType } from '~associations/types';
import type { IconPack, IconPacks } from '~associations/IconPack';

type RawFileIconAssociation = {
  fileNames: string;
  icon: string;
  name: string;
  pattern: string;
  iconType: 'FILE';
  priority: string;
  iconColor: string;
  url?: string;
  iconPack?: IconPack;
};

type CompiledFileIconAssociation = RawFileIconAssociation & { regex: RegExp };

const DEFAULT: FileIconAssociation = {
  fileNames: '',
  name: 'Default',
  pattern: new RegExp(''),
  iconColor: '78909C',
  iconType: IconType.FILE,
  enabled: true,
  priority: 1,
  icon: '/icons/files/default.svg',
};

// Compile every pattern once at module load instead of per lookup.
const ASSOCIATIONS: CompiledFileIconAssociation[] = iconAssociations.associations.associations.regex
  .map((entry) => entry.value as RawFileIconAssociation)
  .map((value) => ({ ...value, regex: new RegExp(value.pattern) }));

const cache = new Map<string, FileIconAssociation>();

export function clearCache(): void {
  cache.clear();
}

const makeFileIconAssociation = (json?: RawFileIconAssociation): FileIconAssociation => {
  if (!json) {
    return DEFAULT;
  }

  return {
    enabled: true,
    fileNames: json.fileNames,
    icon: json.icon,
    iconColor: json.iconColor,
    iconType: IconType.FILE,
    name: json.name,
    pattern: new RegExp(json.pattern),
    priority: parseInt(json.priority, 10),
    url: json.url,
    iconPack: json.iconPack,
  };
};

function findAssociation(name: string, iconPacks?: IconPacks): CompiledFileIconAssociation | undefined {
  return ASSOCIATIONS
    .filter((assoc) => !assoc.iconPack || iconPacks?.[assoc.iconPack.toLowerCase()])
    .find((assoc) => assoc.regex.test(name));
}

export function getAssociation(name: string, iconPacks?: IconPacks): FileIconAssociation {
  const cached = cache.get(name);
  if (cached) {
    return cached;
  }

  const found = makeFileIconAssociation(findAssociation(name, iconPacks));
  cache.set(name, found);
  return found;
}

export function getFileIconName(assoc: FileIconAssociation = DEFAULT): string {
  return assoc.icon
    .replace('/icons/files/', '')
    .replace('.svg', '')
    .replace('-', '_');
}
