import type { PlasmoContentScript } from 'plasmo';
import select from 'select-dom';
import {
  injectIconsGithub,
  injectIconsSearch,
  injectIconsBitbucket,
  injectIconsGitlab,
  injectIconsPullRequests,
  injectIconsGitee,
} from '~providers';

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

document.addEventListener('turbo:load', init);
init();

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