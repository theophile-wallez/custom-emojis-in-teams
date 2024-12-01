import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

import { type EmojiId, type CustomEmojisMap, customEmojisSchema } from '@extension/emojis';

const DEFAULT_STORAGE = {} as const satisfies CustomEmojisMap;

const newExternalMappingStorage = createStorage<CustomEmojisMap>('external-mapping-storage', DEFAULT_STORAGE, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const externalMappingStorage = {
  ...newExternalMappingStorage,
  reset: async () => {
    return await newExternalMappingStorage.set({});
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
  safeSet: async (data: CustomEmojisMap) => {
    const response = customEmojisSchema.safeParse(data);
    if (response.success) {
      await newExternalMappingStorage.set(response.data);
      return response.data;
    }
    return undefined;
  },
  addOrUpdateEmojiById: async (id: EmojiId, src: string) => {
    const response = customEmojisSchema.safeParse({ [id]: src });
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
