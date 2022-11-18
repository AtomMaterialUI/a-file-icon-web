export const bigger = (svg, size = 20) => svg
  .replace('width="16px"', ``)
  .replace('height="16px"', ``);

export const wrapSvg = async (svg, styles = '', size = 20, className = '') => {
  // let css = `display: flex; align-items: center; ${styles}`;
  let css = `${styles}`;
  // if (await isMonochrome()) {
  //   css += `filter: grayscale(1);`;
  // }

  return `<span class='atomIcon ${className}' style='${css}'>${svg}</span>`;
};

export const withColor = (svg, color) => {
  return svg.replaceAll(/fill="(.*)"/g, `fill="${color}"`);
};

export const changeCssVariable = (property: string, value: string) => {
  const r = document.documentElement;
  r.style.setProperty(property, value);
};