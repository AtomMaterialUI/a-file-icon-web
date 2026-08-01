import * as icons from '../../public/icons/folders/index';

export { getFolderAssociation, getFolderIconName } from '~associations/folderAssociations';

export function getFolderIcon(iconName: string) {
  return icons[`folder_${iconName}`];
}
