import {getAssociation, getFileIcon, getFileIconName, getFolderAssociation, getFolderIcon, getFolderIconName} from '../associations';
import select from 'select-dom';

export function injectIconsBitbucket(target) {
  const $items = select.all('.css-lx2ipf', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('[aria-label="File"]', item);
    const isDir = select.exists('[aria-label="Directory"]', item);
    const name = select('.css-1h33pcj > a', item).textContent;
    const $icon = select('.css-18wglxo > a', item);

    if (isFile) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.innerHTML = icon.default;
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.innerHTML = icon.default;
    }
  });
}
