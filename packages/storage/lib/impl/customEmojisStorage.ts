import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

import { type CustomEmojisMap } from '@extension/emojis';

const DEFAULT_STORAGE = {} as const satisfies CustomEmojisMap;

const newCustomEmojiStorage = createStorage<CustomEmojisMap>('custom-emoji-storage', DEFAULT_STORAGE, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const customEmojiStorage = {
  ...newCustomEmojiStorage,
  reset: async () => {
    return await newCustomEmojiStorage.set({});
  },
  merge: async (data: CustomEmojisMap) => {
    return await newCustomEmojiStorage.set(currentData => ({ ...currentData, ...data }));
  },
};
