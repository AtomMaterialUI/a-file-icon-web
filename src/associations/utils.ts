export const bigger = (svg, size = 24) => {
  return svg
    .replace('width="16px"', `width="${size}px"`)
    .replace('height="16px"', `height="${size}px"`);
};
