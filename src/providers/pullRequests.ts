import { AbstractProvider } from '~providers/AbstractProvider';

export class PullRequestsProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.octicon-file-directory-fill';
  }

  public get fileClass(): string {
    return '.octicon-file';
  }

  public get iconClass(): string {
    return '.ActionList-item-visual svg';
  }

  public get itemsClass(): string {
    return '.ActionList-item';
  }

  public get nameClass(): string {
    return '.ActionList-item-label';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

  public get styles(): string {
    return '';
  }

}
