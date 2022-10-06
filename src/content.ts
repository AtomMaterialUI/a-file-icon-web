import type { PlasmoContentScript } from 'plasmo';
import select from 'select-dom';
import { injectIconsGithub } from '~providers';

const apply = (target: ParentNode) => {
  if (select.exists('.js-navigation-item > [role="gridcell"]', target)) {
    injectIconsGithub(target);
  }
  // else if (select.exists('.tree-browser-result > .octicon', target)) {
  //   injectIconsSearch(target);
  // }
  // else if (select.exists('.ActionList-item-visual > .octicon', target)) {
  //   injectIconsPullRequests(target);
  // }
  // else if (select.exists('.css-hix1c1 > [data-qa="repository-directory"]', target)) {
  //   injectIconsBitbucket(target);
  // }
  // else if (select.exists('.tree-content-holder [data-qa-selector="file_tree_table"]', target)) {
  //   injectIconsGitlab(target);
  // }
  // else if (select.exists('.tree-table .tree-item', target)) {
  //   injectIconsGitee(target);
  // }
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