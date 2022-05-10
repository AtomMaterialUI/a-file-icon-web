import {bigger, getAssociation, getFileIcon, getFileIconName, getFolderAssociation, getFolderIcon, getFolderIconName} from '../associations';
import select from 'select-dom';

export function injectIconsGitlab(target) {
  const $items = select.all('.tree-item', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('.file-icon', item);
    const isDir = select.exists('.folder-icon', item);
    // const isSvg = select.exists('.gl-icon', item);

    const name = select('.tree-item-link > span:last-child', item)?.textContent;
    const $icon = select('.tree-item-link > span:first-child', item);

    if (isFile) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.innerHTML = bigger(icon.default, 16);
      $icon.style.verticalAlign = '-3px';
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.innerHTML = bigger(icon.default, 20);
      $icon.style.verticalAlign = '-6px';
    }
  });
}
