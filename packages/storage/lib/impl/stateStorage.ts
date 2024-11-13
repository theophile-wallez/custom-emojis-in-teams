import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

type StateData = {
  updateTimeDelta: 6;
} & Partial<{ lastUpdate: Date; sourceUrl: string }> &
  (
    | {
        source: 'manual';
      }
    | {
        source: 'link';
        lastUpdate: Date;
      }
  );
const DEFAULT_UPDATE_TIME_DELTA = 6 as const;
const DEFAULT_SETTINGS: StateData = {
  source: 'link',
  lastUpdate: new Date(),
  updateTimeDelta: DEFAULT_UPDATE_TIME_DELTA,
} as const satisfies StateData;

const inititalSettingsStorage = createStorage<StateData>('custom-emoji-storage', DEFAULT_SETTINGS, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const settingsStorage = {
  ...inititalSettingsStorage,
  toggleSource: async () => {
    const data = await settingsStorage.get();

    if (data.source === 'manual') {
      await settingsStorage.set(data => ({
        lastUpdate: new Date(),
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
};
