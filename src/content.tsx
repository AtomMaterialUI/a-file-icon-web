import { useCallback, useEffect, useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { GlobalStyles } from '~Global.styled';
import { FabPopup } from '~content/FabPopup';
import { Fab } from '~content/Fab';
import { createProvider } from '~providers/ProviderFactory';
import { useFab, useIconColor, useIconPacks, useIconSize, useMonochrome } from '~common/selectors';
import { changeCssVariable } from '~associations/utils';
import { CSS_VAR_ICON_COLOR, CSS_VAR_ICON_SIZE, CSS_VAR_MONOCHROME } from '~common/constants';

const styleElement = document.createElement('style');

const styleCache = createCache({
  key: 'plasmo-emotion-cache',
  prepend: true,
  container: styleElement,
});

export const getStyle = () => styleElement;

export const config = {
  css: [
    '../public/global.css',
  ],
  matches: [
    'http://github.com/*',
    'https://github.com/*',
    'http://bitbucket.org/*',
    'https://bitbucket.org/*',
    'http://gitlab.com/*',
    'https://gitlab.com/*',
    'http://gitee.com/*',
    'https://gitee.com/*',
    'http://dev.azure.com/*',
    'https://dev.azure.com/*',
  ],
};

let oldHref = window.location.href;

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMonochrome } = useMonochrome();
  const { iconSize } = useIconSize();
  const { accentColor } = useIconColor();
  const { iconPacks } = useIconPacks();
  const { showFab } = useFab();

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  const apply = useCallback((target: ParentNode) => {
    const settings = {
      isMonochrome,
      iconSize,
      iconPacks,
      accentColor,
    };
    const provider = createProvider(target, settings);
    if (!provider) {
      return;
    }

    provider.injectIcons();
  }, [isMonochrome, iconSize, iconPacks, accentColor]);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (oldHref !== window.location.href) {
        oldHref = window.location.href;
      }
      if (mutation.type === 'childList') {
        const target = mutation.target as ParentNode;
        apply(target);
      }
    });
  });

  const init = useCallback(() => {
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

  }, [apply]);

  useEffect(() => {
    document.addEventListener('turbo:load', init);
    init();
    // applying on body in case the list is already present
    setTimeout(() => apply(document.body), 100);

    return () => document.removeEventListener('turbo:load', init);
  }, []);

  useEffect(() => {
    changeCssVariable(CSS_VAR_MONOCHROME, isMonochrome ? 'grayscale(1)' : 'none');
    changeCssVariable(CSS_VAR_ICON_SIZE, `${iconSize}px`);
    changeCssVariable(CSS_VAR_ICON_COLOR, accentColor);
  }, [isMonochrome, iconSize, iconPacks, accentColor]);

  useEffect(() => {
    // close on clicking on the document
    if (isOpen) {
      const listener = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('plasmo-csui')) {
          close();
        }
      };

      document.addEventListener('click', listener);
      return () => document.removeEventListener('click', listener);
    }
  }, [isOpen]);

  return (
    <CacheProvider value={styleCache}>
      <Global styles={GlobalStyles}/>

      {showFab && <Fab onClick={toggle}/>}

      {isOpen && <FabPopup/>}
    </CacheProvider>
  );
};

export default App;
