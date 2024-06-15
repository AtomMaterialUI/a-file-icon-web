import type { IconPack } from '~associations/IconPack';

export enum IconType {
  FILE = 'FILE',
  FOLDER = 'FOLDER'
}

type IconAssociation = {
  enabled: boolean;
  icon: string;
  name: string;
  pattern: RegExp;
  iconType: IconType;
  priority: number;
}

export type FileIconAssociation = IconAssociation & {
  fileNames: string;
  iconType: IconType.FILE;
  iconColor: string;
  url?: string;
  iconPack?: IconPack;
}

export type FolderIconAssociation = IconAssociation & {
  folderNames: string;
  folderColor: string;
  folderIconColor: string;
  iconType: IconType.FOLDER;
}

export type AtomSettings = {
  isMonochrome: boolean;
  iconSize: number;
  iconPacks: IconPack[];
}