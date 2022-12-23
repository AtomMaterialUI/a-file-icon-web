import { AbstractProvider } from '~providers/AbstractProvider';

export class GitHubCodeViewTreeProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.PRIVATE_TreeView-directory-icon';
  }

  public get fileClass(): string {
    return '.octicon-file';
  }

  public get iconClass(): string {
    return '.PRIVATE_TreeView-item-visual';
  }

  public get itemsClass(): string {
    return '.PRIVATE_TreeView-item-content';
  }

  public get nameClass(): string {
    return '.PRIVATE_TreeView-item-content-text';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

  public get styles(): string {
    return '';
  }

}
