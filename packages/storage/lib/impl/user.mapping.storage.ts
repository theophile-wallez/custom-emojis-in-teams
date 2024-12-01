import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

import { customEmojisSchema, type EmojiId, type CustomEmojisMap } from '@extension/emojis';

const DEFAULT_STORAGE = {} as const satisfies CustomEmojisMap;

const newUserMappingStorage = createStorage<CustomEmojisMap>('user-mapping-storage', DEFAULT_STORAGE, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const userMappingStorage = {
  ...newUserMappingStorage,
  reset: async () => {
    return await newUserMappingStorage.set({});
  },
  removeById: async (id: string) => {
    console.log('removeById: ', id);
    return await newUserMappingStorage.set(currentData => {
      const newData = { ...currentData };
      delete newData[id as EmojiId];
      console.log('newData: ', newData);
      return newData;
    });
  },
  getById: async (id: string) => {
    const data = await newUserMappingStorage.get();
    return data[id as EmojiId];
  },
  safeSet: async (data: CustomEmojisMap) => {
    const response = customEmojisSchema.safeParse(data);
    if (response.success) {
      await newUserMappingStorage.set(response.data);
      return response.data;
    }
    return undefined;
  },
  addOrUpdateEmojiById: async (id: string, src: string) => {
    const response = customEmojisSchema.safeParse({ [id]: src });
    if (response.success) {
      await newUserMappingStorage.set(currentData => {
        currentData[id as EmojiId] = src;
        return currentData;
      });
      return response.data;
    }
    return undefined;
  },
};
