import * as icons from '../../public/icons/files/index';

export { clearCache, getAssociation, getFileIconName } from '~associations/fileAssociations';

export function getFileIcon(iconName: string, isDark = false) {
  const darkIcon = icons[`file_${iconName}${isDark ? '_dark' : ''}`];
  return darkIcon ?? icons[`file_${iconName}`];
}
