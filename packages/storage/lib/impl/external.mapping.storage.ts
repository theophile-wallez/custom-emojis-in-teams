import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

import { type CustomEmojisMap } from '@extension/emojis';

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
  merge: async (data: CustomEmojisMap) => {
    return await newExternalMappingStorage.set(currentData => ({ ...currentData, ...data }));
  },
};
