import iconAssociations from '../../public/folder_associations.json';
import * as icons from '../../public/icons/folders/index';
import type { FolderIconAssociation, AtomSettings } from '~associations/types';
import { IconType } from '~associations/types';
import { NodeLinkedList } from '~associations/NodeLinkedList';

type RawFolderIconAssociation = {
  folderNames: string;
  icon: string;
  name: string;
  pattern: string;
  iconType: 'FOLDER';
  priority: string;
  folderColor: string;
  folderIconColor: string;
}

const cache = new NodeLinkedList<FolderIconAssociation>();

const DEFAULT: FolderIconAssociation = {
  enabled: true,
  folderNames: '',
  folderColor: '78909C',
  folderIconColor: 'B0BEC5',
  icon: '/default.svg',
  iconType: IconType.FOLDER,
  name: 'Default',
  pattern: new RegExp(''),
  priority: 1,
};

const makeFolderIconAssociation = (json: RawFolderIconAssociation): FolderIconAssociation => {
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
    priority: parseInt(json.priority, 10),
    folderIconColor: json.folderIconColor,
    folderColor: json.folderColor,
  };
};

function searchInCache(name: string): FolderIconAssociation | null {
  return cache.find((assoc: FolderIconAssociation) => {
    return assoc.priority >= 100 && assoc.pattern.test(name);
  });
}

function findAssociation() {
  return iconAssociations.associations.associations.regex.map(i => i.value) as RawFolderIconAssociation[];
}

export function getFolderAssociation(name: string, settings: AtomSettings): FolderIconAssociation {
  const regexps = findAssociation();

  const cached = searchInCache(name);
  if (cached) {
    return cached;
  }

  let foundAssoc = makeFolderIconAssociation(regexps.find(assoc => new RegExp(assoc.pattern.replace('^', ''), 'g')
    .test(name.toLowerCase())));
  if (foundAssoc) {
    cache.put(foundAssoc);
  }
  return foundAssoc ?? DEFAULT;
}

export function getFolderIconName(assoc: FolderIconAssociation = DEFAULT) {
  return `${assoc.icon
    .replace('/', '')
    .replace('.svg', '')
    .replace('-', '_')}`;
}

export function getFolderIcon(iconName: string) {
  return icons[`folder_${iconName}`];
}
