import select from 'select-dom';
import { getAssociation, getFileIcon, getFileIconName } from '~associations/files';
import { getFolderIconName, getFolderAssociation, getFolderIcon } from '~associations/folders';
import { bigger } from '~associations/utils';

export const injectIconsGitee = target => {
  const $items = select.all('.tree-item', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('.icon-file', item);
    const isDir = select.exists('.icon-folders', item);
    const name = select('.tree-list-item > a', item)?.textContent?.trim();
    const $icon = select('.iconfont', item);

    if (isFile) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.outerHTML = bigger(icon);
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.outerHTML = bigger(icon);
    }
  });
};
