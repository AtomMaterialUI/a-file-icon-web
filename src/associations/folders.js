import iconAssociations from '../../public/folder_associations.json';
import * as icons from '../../public/icons/folders/index';
import { LinkedList } from './linkedlist';

const cache = new LinkedList();

const DEFAULT = {
  fileNames: '',
  name: 'Default',
  pattern: '',
  color: '78909C',
  icon: '/default.svg',
};

export function getFolderAssociation(name) {
  const regexps = iconAssociations.associations.associations.regex;

  const cached = searchInCache(name);
  if (cached) { return cached; }

  let foundAssoc = regexps.find(assoc => new RegExp(assoc.pattern).test(name.toLowerCase()));
  cache.put(foundAssoc);
  return foundAssoc || DEFAULT;
}

function searchInCache(name) {
  return cache.find(assoc => new RegExp(assoc.pattern).test(name));
}

export function getFolderIconName(assoc = DEFAULT) {
  return `${assoc.icon
    .replace('/', '')
    .replace('.svg', '')
    .replace('-', '_')}`;
}

export function getFolderIcon(iconName) {
  return icons[`folder_${iconName}`];
}
