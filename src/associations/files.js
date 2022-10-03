import iconAssociations from '../../public/icon_associations.json';
import * as icons from '../../public/icons/files/index';
import { LinkedList } from './linkedlist';

const cache = new LinkedList();

const DEFAULT = {
  fileNames: '',
  name: 'Default',
  pattern: '',
  color: '78909C',
  icon: '/icons/files/default.svg',
};

export function getAssociation(name) {
  const regexps = iconAssociations.associations.associations.regex;

  const cached = searchInCache(name);
  if (cached) { return cached; }

  let foundAssoc = regexps.find(assoc => new RegExp(assoc.pattern).test(name));
  cache.put(foundAssoc);
  return foundAssoc || DEFAULT;
}

function searchInCache(name) {
  return cache.find(assoc => new RegExp(assoc.pattern).test(name));
}

export function getFileIconName(assoc = DEFAULT) {
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
