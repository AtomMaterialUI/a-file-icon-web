import { AbstractProvider } from '~providers/AbstractProvider';

export class GiteeProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.icon-folders';
  }

  public get fileClass(): string {
    return '.icon-file';
  }

  public get iconClass(): string {
    return '.iconfont';
  }

  public get itemsClass(): string {
    return '.tree-item';
  }

  public get nameClass(): string {
    return '.tree-list-item > a';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

  public get styles(): string {
    return '';
  }

}
