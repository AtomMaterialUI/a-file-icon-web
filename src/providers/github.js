import select from 'select-dom';
import {getAssociation, getFileIcon, getFileIconName, getFolderAssociation, getFolderIcon, getFolderIconName} from '../associations';

export function injectIconsGithub(target) {
  const $items = select.all('.js-navigation-item', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('.octicon-file', item);
    const isDir = select.exists('.octicon-file-directory', item);
    const isSvg = select.exists('.octicon-file-text', item);
    const name = select('.js-navigation-open', item).textContent;
    const $icon = select('.icon', item);

    if (isFile || isSvg) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.innerHTML = icon.default;

      if (isSvg) {
        select('svg', item).remove();
      }
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.innerHTML = icon.default;
    }
  });
}
