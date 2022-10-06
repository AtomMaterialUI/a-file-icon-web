import select from 'select-dom';

export const injectIconsPullRequests = target => {
  const $items = select.all('.ActionList-item', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('.octicon-file', item);
    const isDir = select.exists('.octicon-file-directory', item);
    const isSvg = select.exists('.octicon-file-text', item);
    const name = select('.ActionList-item-label', item)?.textContent;
    const $icon = select('.octicon-file', item);

    // if (name && isFile || isSvg) {
    //   let assoc = getAssociation(name.trim());
    //   let className = getFileIconName(assoc);
    //
    //   const icon = getFileIcon(className);
    //   $icon.innerHTML = icon.default;
    //
    //   if (isSvg) {
    //     select('svg', item).remove();
    //   }
    // }
    // else if (name && isDir) {
    //   let assoc = getFolderAssociation(name.trim());
    //   let className = getFolderIconName(assoc);
    //
    //   const icon = getFolderIcon(className);
    //   $icon.innerHTML = icon.default;
    // }
  });
};
