import select from 'select-dom';
import { getAssociation, getFileIcon, getFileIconName } from '~associations/files';
import { getFolderIconName, getFolderAssociation, getFolderIcon } from '~associations/folders';
import { AbstractProvider } from '~providers/AbstractProvider';

export const injectIconsSearch = target => {
  const $items = select.all('.tree-browser-result', target);

  $items.forEach(async (item, index) => {
    const isFile = select.exists('.octicon-file', item);
    const isDir = select.exists('.octicon-file-directory', item);
    const isSvg = select.exists('.octicon-file-text', item);
    const name = select('.tree-browser-result marked-text', item)?.textContent;
    const $icon = select('.octicon-file', item);

    if (isFile || isSvg) {
      let assoc = getAssociation(name);
      let className = getFileIconName(assoc);

      const icon = getFileIcon(className);
      $icon.innerHTML = icon;

      if (isSvg) {
        select('svg', item).remove();
      }
    }
    else if (isDir) {
      let assoc = getFolderAssociation(name);
      let className = getFolderIconName(assoc);

      const icon = getFolderIcon(className);
      $icon.innerHTML = icon;
    }
  });
};

export class GitHubSearchProvider extends AbstractProvider {
  public get styles(): string {
    return '';
  }

  public get dirClass(): string {
    return '.octicon-file-directory';
  }

  public get fileClass(): string {
    return '.octicon-file';
  }

  public get iconClass(): string {
    return '.octicon-file';
  }

  public get itemsClass(): string {
    return '.tree-browser-result';
  }

  public get nameClass(): string {
    return '.tree-browser-result marked-text';
  }

  public get svgClass(): string | undefined {
    return '.octicon-file-text';
  }

}
