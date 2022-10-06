import select from 'select-dom';
import { getAssociation, getFileIcon, getFileIconName } from '~associations/files';
import { getFolderIconName, getFolderAssociation, getFolderIcon } from '~associations/folders';
import { bigger } from '~associations/utils';

export const injectIconsBitbucket = target => {
  console.log('buk');
  const $items = select.all('.css-134uz78', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('[aria-label="File,"]', item);
    const isDir = select.exists('[aria-label="Directory,"]', item);
    const name = select('.css-15qk21d', item)?.textContent;
    const $icon = select('.css-x5ykhp', item);
    console.log('name', name, isFile, isDir);

    if (isFile) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.innerHTML = bigger(icon);
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.innerHTML = bigger(icon);
    }
  });
};
