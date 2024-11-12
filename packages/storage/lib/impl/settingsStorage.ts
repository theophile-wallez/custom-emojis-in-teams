import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

type StorageData = {
  source: 'manual' | 'link';
  lastUpdated: Date;
};

const DEFAULT_SETTINGS: StorageData = {
  source: 'manual',
  lastUpdated: new Date(),
} as const satisfies StorageData;

const newSettingsStorage = createStorage<StorageData>('custom-emoji-storage', DEFAULT_SETTINGS, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const settingsStorage = {
  ...newSettingsStorage,
  toggleSource: async () => {
    await newSettingsStorage.set(data => ({
      ...data,
      source: data.source === 'manual' ? 'link' : 'manual',
    }));
  },
};
