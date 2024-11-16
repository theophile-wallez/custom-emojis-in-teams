import { StorageEnum } from '../../base/enums';
import { createStorage } from '../../base/base';
import type { SettingsData } from './settings.types';
import { DEFAULT_SETTINGS } from './settings.defaults';

const rawSettingsStorage = createStorage<SettingsData>('settings-storage', DEFAULT_SETTINGS, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const settingsStorage = {
  ...rawSettingsStorage,
  toggleSource: async () => {
    const data = await settingsStorage.get();

    if (data.isSync === false) {
      await settingsStorage.set(data => ({
        lastUpdate: Date.now(),
        ...data,
        source: 'link',
      }));
    } else {
      await settingsStorage.set(data => ({
        ...data,
        source: 'manual',
      }));
    }
  },

  setProperty: async (property: keyof SettingsData, value: SettingsData[keyof SettingsData]) => {
    await settingsStorage.set(data => ({
      ...data,
      [property]: value,
    }));
  },

  getProperty: async <K extends keyof SettingsData>(key: K) => {
    const state = await settingsStorage.get();
    return state[key] as SettingsData[K];
  },
};
