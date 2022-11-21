import { AbstractProvider } from '~providers/AbstractProvider';

export class GitLabProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.folder-icon';
  }

  public get fileClass(): string {
    return '.file-icon';
  }

  public get iconClass(): string {
    return '.tree-item-link > span:first-child';
  }

  public get itemsClass(): string {
    return '.tree-item';
  }

  public get nameClass(): string {
    return '.tree-item-link > span:last-child';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

  public get styles(): string {
    return '';
  }

}
