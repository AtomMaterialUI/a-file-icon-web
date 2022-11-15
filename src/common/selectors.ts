import { useStorage } from '@plasmohq/storage/hook';
import { MONOCHROME, ICON_SIZE, ICON_COLOR } from '~common/constants';

export const useMonochrome = () => {
  const [isEnabled, setIsEnabled] = useStorage(MONOCHROME, true);

  return {
    isEnabled,
    setIsEnabled,
  };
};

export const useIconSize = () => {
  const [iconSize, setIconSize] = useStorage<number>(ICON_SIZE, 20);

  return {
    iconSize,
    setIconSize,
  };
};

export const useIconColor = () => {
  const [accentColor, setAccentColor] = useStorage<string | null>(ICON_COLOR, null);

  return {
    accentColor,
    setAccentColor,
  };
};