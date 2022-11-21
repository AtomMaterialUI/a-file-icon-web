import { AbstractProvider } from '~providers/AbstractProvider';

export class GitHubProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.octicon-file-directory-fill';
  }

  public get fileClass(): string {
    return '.octicon-file';
  }

  public get iconClass(): string {
    return '.octicon';
  }

  public get itemsClass(): string {
    return '.js-navigation-item';
  }

  public get nameClass(): string {
    return '.js-navigation-open';
  }

  public get svgClass(): string | undefined {
    return '.octicon-file-text';
  }

  public get styles(): string {
    return '';
  }

}
