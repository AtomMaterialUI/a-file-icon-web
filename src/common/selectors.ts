import { useStorage } from '@plasmohq/storage/hook';

export const useMonochrome = () => {
  const [isEnabled, setIsEnabled] = useStorage('atom:isMonochrome', true);

  return {
    isEnabled,
    setIsEnabled,
  };
};

export const useIconSize = () => {
  const [iconSize, setIconSize] = useStorage<number>('atom:iconSize', 6);

  return {
    iconSize,
    setIconSize,
  };
};

export const useIconColor = () => {
  const [accentColor, setAccentColor] = useStorage<string | null>('atom:accentColor', null);

  return {
    accentColor,
    setAccentColor,
  };
};