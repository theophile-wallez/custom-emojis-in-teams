import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

import { type CustomEmojisStorageMap } from '@extension/emojis';

type Url = `http${'s' | ''}://${string}`;
type CustomEmojiMap = Record<string, Url>;
export type CustomEmojiStorage = BaseStorage<CustomEmojisStorageMap> & {
  reset: () => Promise<void>;
};

const defaultEmojis: CustomEmojiMap = {};
const emojiStorage = createStorage<CustomEmojisStorageMap>('custom-emoji-storage', defaultEmojis, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const customEmojiStorage: CustomEmojiStorage = {
  ...emojiStorage,
  reset: async () => {
    return await emojiStorage.set({});
  },
};
