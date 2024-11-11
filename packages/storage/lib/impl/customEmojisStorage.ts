import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type Url = `http${'s' | ''}://${string}`;
type CustomEmojiMap = Record<string, Url>;
export type CustomEmojiStorage = BaseStorage<CustomEmojiMap> & {
  reset: () => Promise<void>;
};

const defaultEmojis: CustomEmojiMap = {};
const emojiStorage = createStorage<CustomEmojiMap>('custom-emoji-storage', defaultEmojis, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const customEmojiStorage: CustomEmojiStorage = {
  ...emojiStorage,
  reset: async () => {
    return await emojiStorage.set({});
  },
};
