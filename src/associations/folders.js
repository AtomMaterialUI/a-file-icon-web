import iconAssociations from '../../public/folder_associations.json';
import * as icons from '../../public/icons/folders/index';

const DEFAULT = {
  fileNames: '',
  name: 'Default',
  pattern: '',
  color: '78909C',
  icon: '/default.svg'
};

export function getFolderAssociation(name) {
  const regexps = iconAssociations.associations.associations.regex;

  return regexps.find(assoc => new RegExp(assoc.pattern).test(name.toLowerCase())) || DEFAULT;
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
