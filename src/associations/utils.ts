export const removeSize = svg => svg
  .replace('width="16px"', ``)
  .replace('height="16px"', ``);

export const wrapSvg = async (svg, styles = '', className = '') =>
  `<span class='atomIcon ${className}' style='${styles}'>${svg}</span>`;

export const withColor = (svg, color) => svg.replaceAll(/fill="(.*)"/g, `fill="${color}"`);

export const changeCssVariable = (property: string, value: string) =>
  document.documentElement.style.setProperty(property, value);