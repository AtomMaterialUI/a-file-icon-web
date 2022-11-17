import { useStorage } from '@plasmohq/storage/hook';
import { MONOCHROME, ICON_SIZE, ICON_COLOR } from '~common/constants';

export const useMonochrome = () => {
  const [isEnabled, setIsEnabled] = useStorage({ key: MONOCHROME, area: 'sync' }, false);

  return {
    isEnabled,
    setIsEnabled,
  };
};

export const useIconSize = () => {
  const [iconSize, setIconSize] = useStorage<number>({ key: ICON_SIZE, area: 'sync' }, 20);

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