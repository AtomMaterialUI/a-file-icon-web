import {get, find} from 'lodash';

const iconAssociations = import('../../public/icon_associations.json');

const DEFAULT = {
  fileNames: '',
  name: 'Default',
  pattern: '',
  color: '78909C',
  icon: '/icons/files/default.svg'
};

export function getAssociation(name) {
  const regexps = get(iconAssociations, 'associations.associations.regex');

  return find(regexps, (assoc => new RegExp(assoc.pattern).test(name.toLowerCase()))) || DEFAULT;
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
