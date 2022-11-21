import { AbstractProvider } from '~providers/AbstractProvider';

export class GitHubCodeViewProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.icon-directory';
  }

  public get fileClass(): string {
    return '.octicon-file';
  }

  public get iconClass(): string {
    return 'svg';
  }

  public get itemsClass(): string {
    return '.react-directory-filename-column';
  }

  public get nameClass(): string {
    return '.react-directory-truncate';
  }

  public get svgClass(): string | undefined {
    return '.color-fg-muted';
  }

  public get styles(): string {
    return '';
  }

}
