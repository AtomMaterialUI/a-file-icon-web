import { Storage } from '@plasmohq/storage';
import { MONOCHROME, ICON_SIZE, ICON_COLOR } from '~common/constants';

const storage = new Storage({ area: 'sync' });

export const isMonochrome = async () => {
  return await storage.get(MONOCHROME);
};

export const iconSize = async () => {
  return await storage.get(ICON_SIZE);
};

export const iconColor = async () => {
  return await storage.get(ICON_COLOR);
};