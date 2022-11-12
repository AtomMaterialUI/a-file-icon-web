import { injectIconsBitbucket, injectIconsGitee, injectIconsGithubv2, injectIconsGitlab, injectIconsPullRequests, injectIconsSearch, injectIconsGithubCodeView } from './providers';
import select from 'select-dom';

function init() {
  console.log('calling init');

  function apply(target) {
    if (select.exists('.js-navigation-item > [role="gridcell"]', target)) {
      injectIconsGithubv2(target);
      return;
    }
    else if (select.exists('.tree-browser-result > .octicon', target)) {
      injectIconsSearch(target);
      return;
    }
    else if (select.exists('.css-hix1c1 > [data-qa="repository-directory"]', target)) {
      injectIconsBitbucket(target);
      return;
    }
    else if (select.exists('.tree-content-holder [data-qa-selector="file_tree_table"]', target)) {
      injectIconsGitlab(target);
      return;
    }
    else if (select.exists('.tree-table .tree-item', target)) {
      injectIconsGitee(target);
      return;
    }

    // GitHub's code-view has both the .ActionList and the directory view
    if (select.exists('.ActionList-item-visual > .octicon', target)) {
      injectIconsPullRequests(target);
    }
    if (select.exists('.react-directory-filename-column', target)) {
      injectIconsGithubCodeView(target);
    }
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const target = mutation.target;
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
}

document.addEventListener('turbo:load', init);
init();
