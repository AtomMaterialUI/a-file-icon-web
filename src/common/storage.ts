import { Storage } from '@plasmohq/storage';
import { ICON_PACKS } from '~common/constants';
import type { IconPacks } from '~associations/IconPack';

const storage = new Storage({ area: 'sync' });

export const localIconPaths = async () => {
  return storage.get<IconPacks>(ICON_PACKS);
};
