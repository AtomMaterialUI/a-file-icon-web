import { AbstractProvider } from '~providers/AbstractProvider';

export class GitHubSearchProvider extends AbstractProvider {
  public get styles(): string {
    return '';
  }

  public get dirClass(): string {
    return '.octicon-file-directory';
  }

  public get fileClass(): string {
    return '.octicon-file';
  }

  public get iconClass(): string {
    return '.octicon-file';
  }

  public get itemsClass(): string {
    return '.tree-browser-result';
  }

  public get nameClass(): string {
    return '.tree-browser-result marked-text';
  }

  public get svgClass(): string | undefined {
    return '.octicon-file-text';
  }

}
