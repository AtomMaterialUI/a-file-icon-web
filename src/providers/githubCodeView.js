import { getAssociation, getFileIcon, getFileIconName, getFolderAssociation, getFolderIcon, getFolderIconName } from '../associations';
import select from 'select-dom';

export function injectIconsGithubCodeView(target) {
  const $items = select.all('.react-directory-filename-column', target);
    
  $items.forEach((item, index) => {
    const isDir = select.exists('.icon-directory', item);
    const name = select('.react-directory-truncate', item)?.textContent?.trim();
    const $icon = select('svg', item);

    if (name) {
      if (isDir) {
        let assoc = getFolderAssociation(name);
        let className = getFolderIconName(assoc);
  
        const icon = getFolderIcon(className);
        $icon.innerHTML = icon.default;
      } else {
        let assoc = getAssociation(name);
        let className = getFileIconName(assoc);

        const icon = getFileIcon(className);
        $icon.innerHTML = icon.default;
      }
    }
  });
}
