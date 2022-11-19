import select from 'select-dom';
import { getAssociation, getFileIcon, getFileIconName } from '~associations/files';
import { getFolderIconName, getFolderAssociation, getFolderIcon } from '~associations/folders';
import { removeSize } from '~associations/utils';
import { AbstractProvider } from '~providers/AbstractProvider';

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
      $icon.outerHTML = removeSize(icon);
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.outerHTML = removeSize(icon);
    }
  });
};

export class GiteeProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.icon-folders';
  }

  public get fileClass(): string {
    return '.icon-file';
  }

  public get iconClass(): string {
    return '.iconfont';
  }

  public get itemsClass(): string {
    return '.tree-item';
  }

  public get nameClass(): string {
    return '.tree-list-item > a';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

  public get styles(): string {
    return '';
  }

}
