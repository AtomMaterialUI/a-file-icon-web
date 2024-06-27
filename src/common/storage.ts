import { Storage } from '@plasmohq/storage';
import { ICON_COLOR, ICON_PACKS, ICON_SIZE, MONOCHROME } from '~common/constants';
import type { IconPacks } from '~associations/IconPack';

const storage = new Storage({ area: 'sync' });

export const localIsMonochrome = async () => {
  return await storage.get(MONOCHROME);
};

export const localIconSize = async () => {
  return await storage.get(ICON_SIZE);
};

export const localIconColor = async () => {
  return await storage.get(ICON_COLOR);
};

export const localIconPaths = async () => {
  return storage.get<IconPacks>(ICON_PACKS);
};
