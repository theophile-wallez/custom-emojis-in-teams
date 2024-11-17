import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

import { type CustomEmojisMap } from '@extension/emojis';

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
  merge: async (data: CustomEmojisMap) => {
    return await newUserMappingStorage.set(currentData => ({ ...currentData, ...data }));
  },
};
