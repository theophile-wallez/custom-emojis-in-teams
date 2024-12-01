import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

import type {
  CustomEmojiMapWithProvider,
  EmojiId,
  CustomEmojisStoreMap,
  customEmojisStoreSchema,
} from '@extension/emojis';

const DEFAULT_STORAGE = {} as const satisfies CustomEmojisStoreMap;

const newExternalMappingStorage = createStorage<CustomEmojisStoreMap>('external-mapping-storage', DEFAULT_STORAGE, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const externalMappingStorage = {
  ...newExternalMappingStorage,
  reset: async () => {
    return await newExternalMappingStorage.set({});
  },
  getWithProvider: async () => {
    const data = await newExternalMappingStorage.get();
    return Object.entries(data).reduce((acc, [id, src]) => {
      acc[id as EmojiId] = { src, provider: 'external' };
      return acc;
    }, {} as CustomEmojiMapWithProvider);
  },
  removeById: async (id: EmojiId) => {
    return await newExternalMappingStorage.set(currentData => {
      delete currentData[id];
      return currentData;
    });
  },
  getById: async (id: EmojiId) => {
    const data = await newExternalMappingStorage.get();
    return data[id];
  },
  safeSet: async (data: CustomEmojisStoreMap) => {
    const response = customEmojisStoreSchema.safeParse(data);
    if (response.success) {
      await newExternalMappingStorage.set(response.data);
      return response.data;
    }
    return undefined;
  },
  addOrUpdateEmojiById: async (id: EmojiId, src: string) => {
    const response = customEmojisStoreSchema.safeParse({ [id]: src });
    if (response.success) {
      await newExternalMappingStorage.set(currentData => {
        currentData[id] = src;
        return currentData;
      });
      return response.data;
    }
    return undefined;
  },
};
