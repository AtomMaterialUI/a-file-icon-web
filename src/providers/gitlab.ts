import select from 'select-dom';
import { getAssociation, getFileIcon, getFileIconName } from '~associations/files';
import { getFolderIconName, getFolderAssociation, getFolderIcon } from '~associations/folders';
import { bigger } from '~associations/utils';
import { AbstractProvider } from '~providers/AbstractProvider';

export const injectIconsGitlab = target => {
  const $items = select.all('.tree-item', target);
  console.log('items', $items);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('.file-icon', item);
    const isDir = select.exists('.folder-icon', item);

    const name = select('.tree-item-link > span:last-child', item)?.textContent?.trim();
    const $icon = select('.tree-item-link > span:first-child', item);

    if (isFile) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.innerHTML = bigger(icon, 20);
      $icon.style.verticalAlign = '-3px';
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.innerHTML = bigger(icon, 20);
      $icon.style.verticalAlign = '-6px';
    }
  });
};

export class GitLabProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.folder-icon';
  }

  public get fileClass(): string {
    return '.file-icon';
  }

  public get iconClass(): string {
    return '.tree-item-link > span:first-child';
  }

  public get itemsClass(): string {
    return '.tree-item';
  }

  public get nameClass(): string {
    return '.tree-item-link > span:last-child';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

}
