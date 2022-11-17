import { getAssociation, getFileIconName, getFileIcon } from '~associations/files';
import { bigger, wrapSvg } from '~associations/utils';
import { getFolderAssociation, getFolderIconName, getFolderIcon } from '~associations/folders';
import select from 'select-dom';
import { iconSize } from '~common/storage';

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

  injectIcons = async () => {
    const $items = select.all(this.itemsClass, this.target);
    const isDark = select('html').dataset['colorMode'] === 'dark';
    const size = Number(await iconSize() || 20);
    // const color = await iconColor();

    $items.forEach(async (item, index) => {
      const isFile = select.exists(this.fileClass, item);
      const isDir = select.exists(this.dirClass, item);
      const isSvg = select.exists(this.svgClass, item);

      const name = select(this.nameClass, item)?.textContent?.trim();
      const $icon = select(this.iconClass, item);

      if (isDir) {
        let assoc = getFolderAssociation(name);
        let className = getFolderIconName(assoc);

        const svg = getFolderIcon(className);
        const icon = await wrapSvg(svg, this.styles, size, 'octicon octicon-file-directory icon-directory');

        if ($icon.parentNode) $icon.outerHTML = bigger(icon, size);
      }
      else if (isFile || isSvg) {
        let assoc = getAssociation(name);
        let className = getFileIconName(assoc);

        const svg = getFileIcon(className, isDark);
        const icon = await wrapSvg(svg, this.styles, size, 'octicon octicon-file');

        if ($icon.parentNode) $icon.outerHTML = bigger(icon, size);
      }
      // else {
      //   let assoc = getAssociation(name);
      //   let className = getFileIconName(assoc);
      //
      //   const svg = getFileIcon(className, isDark);
      //   const icon = await wrapSvg(svg, this.styles, size, 'octicon octicon-file');
      //
      //   if ($icon.parentNode) $icon.outerHTML = bigger(icon, size);
      // }
    });
  };
}
