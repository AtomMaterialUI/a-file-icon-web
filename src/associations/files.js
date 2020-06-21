import iconAssociations from '../../public/icon_associations.json';
import * as icons from '../../public/icons/files/index';

const DEFAULT = {
  fileNames: '',
  name: 'Default',
  pattern: '',
  color: '78909C',
  icon: '/icons/files/default.svg'
};

export function getAssociation(name) {
  const regexps = iconAssociations?.associations?.associations?.regex;

  return regexps.find(assoc => new RegExp(assoc.pattern).test(name)) || DEFAULT;
}

export function getFileIconName(assoc = DEFAULT) {
  return `${assoc.icon
    .replace('/icons/files/', '')
    .replace('.svg', '')
    .replace('-', '_')
  }`;
}

export function getFileIcon(iconName) {
  return icons[`file_${iconName}`];
}
