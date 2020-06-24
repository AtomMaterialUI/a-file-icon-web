import {injectIconsBitbucket, injectIconsGithubv2, injectIconsSearch} from './providers';
import select from 'select-dom';

function init() {
  function apply(target) {
    if (select.exists('.js-navigation-item > [role="gridcell"]', target)) {
      injectIconsGithubv2(target);
    }
    else if (select.exists('.js-tree-browser-result-anchor > .octicon', target)) {
      injectIconsSearch(target);
    }
    else if (select.exists('.css-lx2ipf > .css-179algp', target)) {
      injectIconsBitbucket(target);
    }
  }

  const observer = new MutationObserver(mutations => {
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      if (mutation.type === 'childList') {
        const target = mutation.target;
        apply(target);
      }
    }
  });
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });

  // applying on body in case the list is already present
  apply(document.body);
}

document.addEventListener('pjax:end', init);
init();
