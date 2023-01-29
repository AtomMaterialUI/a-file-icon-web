import { getAssociation, getFileIconName, getFileIcon } from '~associations/files';
import { removeSize, wrapSvg } from '~associations/utils';
import { getFolderAssociation, getFolderIconName, getFolderIcon } from '~associations/folders';
import select from 'select-dom';
import debounce from 'lodash.debounce';

export type IconProvider = {
  dirClass: string;
  fileClass: string;
  iconClass: string;
  itemsClass: string;
  nameClass: string;
  svgClass?: string;
  injectIcons();
}

export abstract class AbstractProvider implements IconProvider {
  constructor(readonly target: ParentNode) {
  }

  abstract get itemsClass(): string;

  abstract get fileClass(): string;

  abstract get dirClass(): string;

  abstract get nameClass(): string;

  abstract get iconClass(): string;

  abstract get svgClass(): string | undefined;

  abstract get styles(): string;

  #injectIcons = async () => {
    const $items = select.all(this.itemsClass, this.target);
    const isDark = select('html').dataset['colorMode'] === 'dark';

    $items.forEach(async (item, index) => {
      // Skip icon if already processed
      if (item.dataset['processed'] === 'true') {
        return;
      }

      const isFile = select.exists(this.fileClass, item);
      const isDir = select.exists(this.dirClass, item);
      const isSvg = select.exists(this.svgClass, item);

      const name = select(this.nameClass, item)?.textContent?.trim();
      const $icon = select(this.iconClass, item);

      if (isDir) {
        let assoc = getFolderAssociation(name);
        let className = getFolderIconName(assoc);

        const svg = getFolderIcon(className);
        const icon = await wrapSvg(svg, this.styles, `octicon ${this.dirClass.replace('.', '')}`);

        if ($icon?.parentNode) {
          $icon.outerHTML = removeSize(icon);
        }
      }
      else if (isFile || isSvg) {
        let assoc = getAssociation(name);
        let className = getFileIconName(assoc);

        const svg = getFileIcon(className, isDark);
        const icon = await wrapSvg(svg, this.styles, `octicon ${this.fileClass}`);

        if ($icon?.parentNode) {
          $icon.outerHTML = removeSize(icon);
        }
      }

      // Set a flag to avoid processing the icon again later
      item.dataset['processed'] = 'true';
    });
  };

  injectIcons = debounce(this.#injectIcons, 1000);
}
