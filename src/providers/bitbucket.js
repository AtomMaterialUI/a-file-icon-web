import {bigger, getAssociation, getFileIcon, getFileIconName, getFolderAssociation, getFolderIcon, getFolderIconName} from '../associations';
import select from 'select-dom';

export function injectIconsBitbucket(target) {
  const $items = select.all('.css-134uz78', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('[aria-label="File,"]', item);
    const isDir = select.exists('[aria-label="Directory,"]', item);
    const name = select('.css-15qk21d', item).textContent;
    const $icon = select('.css-x5ykhp', item);

    if (isFile) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.innerHTML = bigger(icon.default);
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.innerHTML = bigger(icon.default);
    }
  });
}
