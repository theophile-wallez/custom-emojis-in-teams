import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

import { type CustomEmojisStorageMap } from '@extension/emojis';

export type CustomEmojiStorage = BaseStorage<CustomEmojisStorageMap> & {
  reset: () => Promise<void>;
};

const DEFAULT_STORAGE = {} as const satisfies CustomEmojisStorageMap;
const newCustomEmojiStorage = createStorage<CustomEmojisStorageMap>('custom-emoji-storage', DEFAULT_STORAGE, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const customEmojiStorage: CustomEmojiStorage = {
  ...newCustomEmojiStorage,
  reset: async () => {
    return await newCustomEmojiStorage.set({});
  },
};
