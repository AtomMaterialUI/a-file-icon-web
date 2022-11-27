import { AbstractProvider } from '~providers/AbstractProvider';

export class AzureProvider extends AbstractProvider {
  public get dirClass(): string {
    return '.repos-folder-icon';
  }

  public get fileClass(): string {
    return '.fabric-icon';
  }

  public get iconClass(): string {
    return '.fabric-icon:not(.bolt-tree-expand-button)';
  }

  public get itemsClass(): string {
    return '.bolt-table-cell';
  }

  public get nameClass(): string {
    return '.bolt-table-cell-content > .text-ellipsis';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

  public get styles(): string {
    return '';
  }

}
