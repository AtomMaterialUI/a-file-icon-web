import { AbstractProvider } from './AbstractProvider';

export class BitBucketProvider extends AbstractProvider {
  public get dirClass(): string {
    return '[aria-label="Directory,"]';
  }

  public get fileClass(): string {
    return '[aria-label="File,"]';
  }

  public get iconClass(): string {
    return '.css-x5ykhp';
  }

  public get itemsClass(): string {
    return '.css-134uz78';
  }

  public get nameClass(): string {
    return '.css-15qk21d';
  }

  public get svgClass(): string | undefined {
    return undefined;
  }

  public get styles(): string {
    return 'margin-right: 1em';
  }

}