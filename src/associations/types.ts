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
}

export type FolderIconAssociation = IconAssociation & {
  folderNames: string;
  folderColor: string;
  folderIconColor: string;
  iconType: IconType.FOLDER;
}
