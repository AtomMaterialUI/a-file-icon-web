import iconAssociations from '../../public/icon_associations.json';
import { NodeLinkedList } from '~associations/NodeLinkedList';
import type { FileIconAssociation } from '~associations/types';
import { IconType } from '~associations/types';
import * as icons from '../../public/icons/files/index';

type RawFileIconAssociation = {
  fileNames: string;
  icon: string;
  name: string;
  pattern: string;
  iconType: 'FILE' | 'FOLDER';
  priority: string;
  iconColor: string;
  url?: string;
}

const cache = new NodeLinkedList<FileIconAssociation>();

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
  };
};

export function getAssociation(name: string): FileIconAssociation {
  const regexps = iconAssociations.associations.associations.regex as RawFileIconAssociation[];

  const cached = searchInCache(name);
  if (cached) {
    return cached;
  }

  let foundAssoc = makeFileIconAssociation(regexps.find(assoc => new RegExp(assoc.pattern).test(name)));
  cache.put(foundAssoc);
  return foundAssoc ?? DEFAULT;
}

function searchInCache(name: string): FileIconAssociation | null {
  return cache.find((assoc: FileIconAssociation) => assoc.pattern.test(name));
}

export function getFileIconName(assoc: FileIconAssociation = DEFAULT) {
  return `${assoc.icon
    .replace('/icons/files/', '')
    .replace('.svg', '')
    .replace('-', '_')
  }`;
}

export function getFileIcon(iconName, isDark = false) {
  const darkIcon = icons[`file_${iconName}${isDark ? '_dark' : ''}`];
  return darkIcon ?? icons[`file_${iconName}`];
}
