import { GitHubCodeViewProvider } from '~providers/githubCodeView';
import select from 'select-dom';
import type { IconProvider } from '~providers/AbstractProvider';
import { PullRequestsProvider } from '~providers/pullRequests';
import { GitHubSearchProvider } from '~providers/search';
import { GitHubProvider } from '~providers/github';
import { GiteeProvider } from '~providers/gitee';
import { GitLabProvider } from '~providers/gitlab';
import { BitBucketProvider } from '~providers/bitbucket';

export const createProvider = (target: ParentNode): IconProvider => {
  if (window.location.hostname.includes('bitbucket')) {
    return new BitBucketProvider(target);
  }
  else if (window.location.hostname.includes('gitlab')) {
    return new GitLabProvider(target);
  }
  else if (window.location.hostname.includes('gitee')) {
    return new GiteeProvider(target);
  }
  else if (select.exists('.js-navigation-item > [role="gridcell"]', target)) {
    return new GitHubProvider(target);
  }
  else if (select.exists('.tree-browser-result > .octicon', target)) {
    return new GitHubSearchProvider(target);
  }
  else if (select.exists('.ActionList-item-visual > .octicon', target)) {
    return new PullRequestsProvider(target);
  }
  else if (select.exists('.react-directory-filename-column', target)) {
    return new GitHubCodeViewProvider(target);
  }
  return null;
};
