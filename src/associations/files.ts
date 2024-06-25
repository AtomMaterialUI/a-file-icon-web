import iconAssociations from '../../public/icon_associations.json';
import { NodeLinkedList } from '~associations/NodeLinkedList';
import type { FileIconAssociation } from '~associations/types';
import { IconType } from '~associations/types';
import * as icons from '../../public/icons/files/index';
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
}

const cache = new NodeLinkedList<FileIconAssociation>();

export function clearCache() {
  cache.clear();
}

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

const makeFileIconAssociation = (json: RawFileIconAssociation): FileIconAssociation => {
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

function findAssociation(regexps: RawFileIconAssociation[], name: string, iconPacks?: IconPacks) {
  return regexps
    .filter(assoc => !assoc.iconPack || iconPacks?.[assoc.iconPack.toLowerCase()])
    .find(assoc => new RegExp(assoc.pattern).test(name));
}

function searchInCache(name: string): FileIconAssociation | null {
  return cache.find((assoc: FileIconAssociation) => {
    return assoc.priority >= 100 && assoc.pattern.test(name);
  });
}

export function getAssociation(name: string, iconPacks?: IconPacks): FileIconAssociation {
  console.log('iconPacks', iconPacks);
  const regexps = iconAssociations.associations.associations.regex.map(i => i.value) as RawFileIconAssociation[];

  const cached = searchInCache(name);
  if (cached) {
    return cached;
  }

  let association = findAssociation(regexps, name, iconPacks);
  let foundAssoc = makeFileIconAssociation(association);
  if (foundAssoc) {
    cache.put(foundAssoc);
  }
  return foundAssoc ?? DEFAULT;
}

export function getFileIconName(assoc: FileIconAssociation = DEFAULT) {
  return `${assoc.icon
    .replace('/icons/files/', '')
    .replace('.svg', '')
    .replace('-', '_')
  }`;
}

export function getFileIcon(iconName: string, isDark = false) {
  const darkIcon = icons[`file_${iconName}${isDark ? '_dark' : ''}`];
  return darkIcon ?? icons[`file_${iconName}`];
}
