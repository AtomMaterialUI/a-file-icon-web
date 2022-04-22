import { injectIconsBitbucket, injectIconsGithubv2, injectIconsGitee, injectIconsGitlab, injectIconsSearch } from './providers';
import select from 'select-dom';

function init() {
  function apply(target) {
    if (select.exists('.js-navigation-item > [role="gridcell"]', target)) {
      injectIconsGithubv2(target);
    }
    else if (select.exists('.tree-browser-result > .octicon', target)) {
      injectIconsSearch(target);
    }
    else if (select.exists('.css-hix1c1 > [data-qa="repository-directory"]', target)) {
      injectIconsBitbucket(target);
    }
    else if (select.exists('.tree-content-holder [data-qa-selector="file_tree_table"]', target)) {
      injectIconsGitlab(target);
    }
    else if (select.exists('.tree-table .tree-item', target)) {
      injectIconsGitee(target);
    }
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const target = mutation.target;
        apply(target);
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
  apply(document.body);
}

document.addEventListener('pjax:end', init);
init();
