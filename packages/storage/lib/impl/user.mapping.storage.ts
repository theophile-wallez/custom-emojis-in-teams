import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

import {
  type CustomEmojiMapWithProvider,
  customEmojisStoreSchema,
  type EmojiId,
  type CustomEmojisStoreMap
} from '@extension/emojis';

const DEFAULT_STORAGE = {} as const satisfies CustomEmojisStoreMap;

const newUserMappingStorage = createStorage<CustomEmojisStoreMap>('user-mapping-storage', DEFAULT_STORAGE, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true
});

export const userMappingStorage = {
  ...newUserMappingStorage,
  reset: async () => {
    return await newUserMappingStorage.set({});
  },
  getWithProvider: async () => {
    const data = await newUserMappingStorage.get();
    return Object.entries(data).reduce((acc, [id, src]) => {
      acc[id as EmojiId] = { src, provider: 'user' };
      return acc;
    }, {} as CustomEmojiMapWithProvider);
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
  removeByIds: async (ids: string[]) => {
    return await newUserMappingStorage.set(currentData => {
      ids.forEach(id => delete currentData[id as EmojiId]);
      return currentData;
    });
  },
  getById: async (id: string) => {
    const data = await newUserMappingStorage.get();
    return data[id as EmojiId];
  },
  safeSet: async (data: CustomEmojisStoreMap) => {
    const response = customEmojisStoreSchema.safeParse(data);
    if (response.success) {
      await newUserMappingStorage.set(response.data);
      return response.data;
    }
    return undefined;
  },
  addOrUpdateEmojiById: async (id: string, src: string) => {
    const response = customEmojisStoreSchema.safeParse({ [id]: src });
    if (response.success) {
      await newUserMappingStorage.set(currentData => {
        currentData[id as EmojiId] = src;
        return currentData;
      });
      return response.data;
    }
    return undefined;
  }
};
