import { isMonochrome } from '~common/storage';

export const bigger = (svg, size = 20) => {
  return svg
    .replace('width="16px"', `width="${size}px"`)
    .replace('height="16px"', `height="${size}px"`);
};

export const wrapSvg = async (svg, styles = '', size = 20) => {
  // let css = `display: flex; align-items: center; ${styles}`;
  let css = `${styles}`;
  if (await isMonochrome()) {
    css += `filter: grayscale(1);`;
  }

  return `<span class='atomIcon' style='${css}'>${svg}</span>`;
};

export const withColor = (svg, color) => {
  return svg.replaceAll(/fill="(.*)"/g, `fill="${color}"`);
};