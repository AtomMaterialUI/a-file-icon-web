import {get, find} from 'lodash';

const iconAssociations = import('../../public/folder_associations.json');

const DEFAULT = {
  fileNames: '',
  name: 'Default',
  pattern: '',
  color: '78909C',
  icon: '/default.svg'
};

export function getFolderAssociation(name) {
  const regexps = get(iconAssociations, 'associations.associations.regex');

  return find(regexps, (assoc => new RegExp(assoc.pattern).test(name.toLowerCase()))) || DEFAULT;
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
