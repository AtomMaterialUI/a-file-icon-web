import { useStorage } from '@plasmohq/storage/hook';
import { MONOCHROME, ICON_SIZE, ICON_COLOR, CSS_VAR_ICON_SIZE, CSS_VAR_MONOCHROME, ALERT } from '~common/constants';
import { changeCssVariable } from '~associations/utils';
import { useRef } from 'react';

export const useMonochrome = () => {
  const { showAlert } = useAlert();
  const [isMonochrome, setIsMonochrome] = useStorage({ key: MONOCHROME, area: 'sync' }, false);

  const handleChange = (v) => {
    changeCssVariable(CSS_VAR_MONOCHROME, v ? 'grayscale(1)' : 'none');
    setIsMonochrome(v);
    showAlert();
  };

  return {
    isMonochrome,
    setIsMonochrome: handleChange,
  };
};

export const useIconSize = () => {
  const { showAlert } = useAlert();
  const [iconSize, setIconSize] = useStorage<number>({ key: ICON_SIZE, area: 'sync' }, 20);
  let timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleIconChange = (v) => {
    setIconSize(v);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      changeCssVariable(CSS_VAR_ICON_SIZE, `${v}px`);
      showAlert();
    }, 600);
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

export const useAlert = () => {
  const [isAlertVisible, setIsAlertVisible] = useStorage<boolean>(ALERT, false);
  const timeout = useRef<NodeJS.Timeout>();

  const showAlert = () => {
    setIsAlertVisible(true);
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  return {
    isAlertVisible,
    showAlert,
  };
};