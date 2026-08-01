import { useCallback, useEffect, useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { GlobalStyles } from '~Global.styled';
import { FabPopup } from '~content/FabPopup';
import { Fab } from '~content/Fab';
import { createProviders } from '~providers/ProviderFactory';
import { useFab, useIconColor, useIconPacks, useIconSize, useMonochrome } from '~common/selectors';
import { changeCssVariable } from '~associations/utils';
import { CSS_VAR_ICON_COLOR, CSS_VAR_ICON_SIZE, CSS_VAR_MONOCHROME } from '~common/constants';
import type { IconProvider } from '~providers/AbstractProvider';
import type { PlasmoMountShadowHost } from 'plasmo';

const styleElement = document.createElement('style');

const styleCache = createCache({
  key: 'plasmo-emotion-cache',
  prepend: true,
  container: styleElement,
});

export const getStyle = () => styleElement;

// Mount the CSUI shadow host inside <body>. Plasmo's default overlay behaviour
// prepends it to <html> (before <head>), which GitHub's Turbo treats as a
// tracked_element_mismatch and reacts to with a full page reload on every
// navigation. Keeping the host within <body> avoids that.
export const mountShadowHost: PlasmoMountShadowHost = ({ shadowHost }) => {
  document.body.appendChild(shadowHost);
};

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

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [providers, setProviders] = useState<Set<IconProvider>>(new Set());
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
    const matched = createProviders(target);
    if (matched.length === 0) return;

    matched.forEach(provider => provider.injectIcons());
    setProviders(providers => new Set([...providers, ...matched]));
  }, []);

  // Observe the page for DOM changes and (re)inject icons on mount.
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          apply(mutation.target as ParentNode);
        }
      });
    });

    const init = () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    document.addEventListener('turbo:load', init);
    init();
    // applying on body in case the list is already present
    const timeoutId = setTimeout(() => apply(document.body), 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('turbo:load', init);
      observer.disconnect();
    };
  }, [apply]);

  // When the icon size or color changes, update the CSS variables
  useEffect(() => {
    changeCssVariable(CSS_VAR_MONOCHROME, isMonochrome ? 'grayscale(1)' : 'none');
    changeCssVariable(CSS_VAR_ICON_SIZE, `${iconSize}px`);
    changeCssVariable(CSS_VAR_ICON_COLOR, accentColor);
  }, [isMonochrome, iconSize, accentColor]);

  // When the icon packs change, reset and re-inject so associations are re-evaluated
  useEffect(() => {
    providers.forEach((provider) => {
      provider?.resetProcessed();
      provider?.injectIcons();
    });
  }, [iconPacks]);

  // Listen for clicks outside the popup to close it
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
