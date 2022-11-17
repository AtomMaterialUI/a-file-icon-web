import type { PlasmoContentScript } from 'plasmo';
import { useCallback, useEffect, useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { GlobalStyles } from '~Global.styled';
import { FabPopup } from '~content/FabPopup';
import { Fab } from '~content/Fab';
import { createProvider } from '~providers/ProviderFactory';

const apply = (target: ParentNode) => {
  const provider = createProvider(target);
  if (!provider) return;
  provider.injectIcons();
};

const init = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const target = mutation.target as ParentNode;
        setTimeout(() => apply(target), 100);
      }
    });
  });
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });

  // applying on body in case the list is already present
  setTimeout(() => apply(document.body), 100);
};

const styleElement = document.createElement('style');

const styleCache = createCache({
  key: 'plasmo-emotion-cache',
  prepend: true,
  container: styleElement,
});

export const getStyle = () => styleElement;

export const config: PlasmoContentScript = {
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
  ],
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  useEffect(() => {
    document.addEventListener('turbo:load', init);
    init();

    return () => document.removeEventListener('turbo:load', init);
  }, []);

  useEffect(() => {
    // close on clicking on the document
    if (isOpen) {
      const listener = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('plasmo-csui')) close();
      };

      document.addEventListener('click', listener);
      return () => document.removeEventListener('click', listener);
    }
  }, [isOpen]);

  return (
    <CacheProvider value={styleCache}>
      <Global styles={GlobalStyles} />

      <Fab onClick={toggle} />

      {isOpen && <FabPopup />}
    </CacheProvider>
  );
};

export default App;