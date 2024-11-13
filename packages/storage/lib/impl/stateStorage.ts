import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';

export type StateData = {
  updateTimeDelta: 6;
} & Partial<{ lastUpdate: number; sourceUrl: string; token: string }> &
  (
    | {
        source: 'manual';
      }
    | {
        source: 'link';
        lastUpdate: number;
      }
  );

const DEFAULT_UPDATE_TIME_DELTA = 6 as const;
const DEFAULT_SETTINGS: StateData = {
  source: 'link',
  lastUpdate: Date.now(),
  updateTimeDelta: DEFAULT_UPDATE_TIME_DELTA,
} as const satisfies StateData;

const initialStateStorage = createStorage<StateData>('state-storage', DEFAULT_SETTINGS, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const stateStorage = {
  ...initialStateStorage,
  toggleSource: async () => {
    const data = await stateStorage.get();

    if (data.source === 'manual') {
      await stateStorage.set(data => ({
        lastUpdate: Date.now(),
        ...data,
        source: 'link',
      }));
    } else {
      await stateStorage.set(data => ({
        ...data,
        source: 'manual',
      }));
    }
  },

  setProperty: async (property: keyof StateData, value: StateData[keyof StateData]) => {
    await stateStorage.set(data => ({
      ...data,
      [property]: value,
    }));
  },

  getProperty: async <K extends keyof StateData>(key: K) => {
    const state = await stateStorage.get();
    return state[key] as StateData[K];
  },
};
