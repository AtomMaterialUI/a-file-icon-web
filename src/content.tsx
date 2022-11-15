import type { PlasmoContentScript } from 'plasmo';
import { useCallback, useEffect, useState } from 'react';
import select from 'select-dom';
import {
  injectIconsGithub,
  injectIconsSearch,
  injectIconsBitbucket,
  injectIconsGitlab,
  injectIconsPullRequests,
  injectIconsGitee,
  injectIconsGithubCodeView,
} from '~providers';

import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { GlobalStyles } from '~Global.styled';
import { FabPopup } from '~content/FabPopup';
import { Fab } from '~content/Fab';

const apply = (target: ParentNode) => {
  if (window.location.hostname.includes('bitbucket')) {
    injectIconsBitbucket(target);
  }
  else if (window.location.hostname.includes('gitlab')) {
    injectIconsGitlab(target);
  }
  else if (window.location.hostname.includes('gitee')) {
    injectIconsGitee(target);
  }
  else if (select.exists('.js-navigation-item > [role="gridcell"]', target)) {
    injectIconsGithub(target);
  }
  else if (select.exists('.tree-browser-result > .octicon', target)) {
    injectIconsSearch(target);
  }
  else if (select.exists('.ActionList-item-visual > .octicon', target)) {
    injectIconsPullRequests(target);
  }
  else if (select.exists('.react-directory-filename-column', target)) {
    injectIconsGithubCodeView(target);
  }
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

  const open = useCallback(() => {
    setIsOpen(true);
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

      <Fab onClick={open} />

      {isOpen && <FabPopup />}
    </CacheProvider>
  );
};

export default App;