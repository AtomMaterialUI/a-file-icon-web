import { GitHubCodeViewProvider } from '~providers/githubCodeView';
import { elementExists } from 'select-dom';
import type { IconProvider } from '~providers/AbstractProvider';
import { GitHubSearchProvider } from '~providers/search';
import { GitHubProvider } from '~providers/github';
import { GitLabProvider } from '~providers/gitlab';
import { BitBucketProvider } from '~providers/bitbucket';
import { GiteeProvider } from '~providers/gitee';
import { PullRequestsProvider } from '~providers/pullRequests';
import { AzureProvider } from '~providers/azure';
import { GitHubCodeViewTreeProvider } from '~providers/githubCodeViewTree';

export const createProviders = (target: ParentNode): IconProvider[] => {
  // Host-specific providers are exclusive: a page is only ever one of these.
  if (window.location.hostname.includes('bitbucket')) {
    return [new BitBucketProvider(target)];
  } else if (window.location.hostname.includes('gitlab')) {
    return [new GitLabProvider(target)];
  } else if (window.location.hostname.includes('gitee')) {
    return [new GiteeProvider(target)];
  } else if (window.location.hostname.includes('azure') && elementExists('.repos-file-explorer-header')) {
    return [new AzureProvider(target)];
  }

  // GitHub can render several icon regions at once (e.g. the code-view
  // file-tree layout shows the tree and the directory listing side by side),
  // so collect every matching view provider instead of the first one.
  const providers: IconProvider[] = [];

  if (elementExists('.tree-browser-result > .octicon', target)) {
    providers.push(new GitHubSearchProvider(target));
  }
  if (elementExists('.ActionList-item-visual > .octicon', target)) {
    providers.push(new PullRequestsProvider(target));
  }
  if (elementExists('.PRIVATE_TreeView-item-content', target)) {
    providers.push(new GitHubCodeViewTreeProvider(target));
  }
  if (elementExists('.react-directory-filename-column', target)) {
    providers.push(new GitHubCodeViewProvider(target));
  }
  if (elementExists('.js-navigation-item > [role="gridcell"]', target)) {
    providers.push(new GitHubProvider(target));
  }

  return providers;
};
