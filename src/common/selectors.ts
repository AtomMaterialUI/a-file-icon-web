import { useStorage } from '@plasmohq/storage/hook';
import {
  MONOCHROME,
  ICON_SIZE,
  ICON_COLOR,
  CSS_VAR_ICON_SIZE,
  CSS_VAR_MONOCHROME,
  ALERT,
  FAB,
} from '~common/constants';
import { changeCssVariable } from '~associations/utils';
import { useEffect, useRef, useState } from 'react';

export const useMonochrome = () => {
  const { showAlert } = useAlert();
  const [isMonochrome, setIsMonochrome] = useStorage(MONOCHROME, false);
  const [localMonochrome, setLocalMonochrome] = useState(isMonochrome);
  let timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleChange = (v) => {
    setLocalMonochrome(v);
    changeCssVariable(CSS_VAR_MONOCHROME, v ? 'grayscale(1)' : 'none');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsMonochrome(v);
      showAlert();
    }, 100);
  };

  useEffect(() => {
    setLocalMonochrome(isMonochrome);
  }, [isMonochrome]);

  return {
    isMonochrome,
    localMonochrome,
    setIsMonochrome: handleChange,
  };
};

export const useIconSize = () => {
  const { showAlert } = useAlert();
  const [iconSize, setIconSize] = useStorage<number>(ICON_SIZE, 20);
  const [localIconSize, setLocalIconSize] = useState(iconSize);
  let timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleIconChange = (v) => {
    setLocalIconSize(v);
    changeCssVariable(CSS_VAR_ICON_SIZE, `${v}px`);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIconSize(v);
      showAlert();
    }, 600);
  };

  useEffect(() => {
    setLocalIconSize(iconSize);
  }, [iconSize]);

  return {
    iconSize,
    localIconSize,
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
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  return {
    isAlertVisible,
    showAlert,
  };
};

export const useFab = () => {
  const { showAlert } = useAlert();
  const [showFab, setShowFab] = useStorage<boolean>(FAB, true);
  const [localShowFab, setLocalShowFab] = useState(showFab);
  let timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleChange = (v) => {
    setLocalShowFab(v);
    changeCssVariable(CSS_VAR_ICON_SIZE, `${v}px`);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowFab(v);
      showAlert();
    }, 600);
  };

  useEffect(() => {
    setLocalShowFab(showFab);
  }, [showFab]);

  return {
    showFab,
    localShowFab,
    setShowFab: handleChange,
  };
};