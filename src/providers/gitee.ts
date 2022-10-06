import select from 'select-dom';

export const injectIconsGitee = target => {
  const $items = select.all('.tree-item', target);
  console.log('a', $items.length);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('.icon-file', item);
    const isDir = select.exists('.icon-folders', item);
    // const isSvg = select.exists('.icon-svg', item);
    const name = select('.tree-list-item > a', item)?.textContent;
    const $icon = select('.iconfont', item);

    // if (isFile) {
    //   let assoc = getAssociation(name);
    //   let className = getFileIconName(assoc);
    //
    //   const icon = getFileIcon(className);
    //   $icon.outerHTML = icon.default.replace('<i', '<svg class="octicon octicon-file" width="20" height="20"');
    // }
    // else if (isDir) {
    //   let assoc = getFolderAssociation(name);
    //   let className = getFolderIconName(assoc);
    //
    //   const icon = getFolderIcon(className);
    //   $icon.outerHTML =
    //     icon.default.replace('<i', '<svg class="octicon octicon-file-directory" width="20" height="20"');
    // }
  });
};
