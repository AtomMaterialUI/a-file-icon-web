import { useStorage } from '@plasmohq/storage/hook';
import { MONOCHROME, ICON_SIZE, ICON_COLOR, CSS_VAR_ICON_SIZE, CSS_VAR_MONOCHROME } from '~common/constants';
import { changeCssVariable } from '~associations/utils';

export const useMonochrome = () => {
  const [isMonochrome, setIsMonochrome] = useStorage({ key: MONOCHROME, area: 'sync' }, false);

  const handleChange = (v) => {
    changeCssVariable(CSS_VAR_MONOCHROME, v ? 'grayscale(1)' : 'none');
    setIsMonochrome(v);
  };

  return {
    isMonochrome,
    setIsMonochrome: handleChange,
  };
};

export const useIconSize = () => {
  const [iconSize, setIconSize] = useStorage<number>({ key: ICON_SIZE, area: 'sync' }, 20);

  const handleIconChange = (v) => {
    changeCssVariable(CSS_VAR_ICON_SIZE, `${v}px`);
    setIconSize(v);
  };

  return {
    iconSize,
    setIconSize: handleIconChange,
  };
};

export const useIconColor = () => {
  const [accentColor, setAccentColor] = useStorage<string | null>(ICON_COLOR, null);

  return {
    accentColor,
    setAccentColor,
  };
};