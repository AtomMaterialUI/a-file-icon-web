import select from 'select-dom';
import { getAssociation, getFileIconName, getFileIcon } from '~associations/files';
import { getFolderIconName, getFolderAssociation, getFolderIcon } from '~associations/folders';

export const injectIconsGithubCodeView = (target: ParentNode) => {
  const $items = select.all('.react-directory-filename-column', target);
  const isDark = select('html').dataset['colorMode'] === 'dark';

  $items.forEach((item, index) => {
    const isDir = select.exists('.icon-directory', item);
    const name = select('.react-directory-truncate', item)?.textContent?.trim();
    const $icon = select('svg', item);

    if (name) {
      if (!isDir) {
        let assoc = getAssociation(name);
        let className = getFileIconName(assoc);

        const icon = getFileIcon(className, isDark);
        $icon.outerHTML = icon.replace('<svg', '<svg class="octicon octicon-file" width="20" height="20"');
      }
      else {
        let assoc = getFolderAssociation(name);
        let className = getFolderIconName(assoc);

        const icon = getFolderIcon(className);
        $icon.outerHTML =
          icon.replace('<svg', '<svg class="octicon octicon-file-directory icon-directory" width="20" height="20"');
      }
    }
  });
};
