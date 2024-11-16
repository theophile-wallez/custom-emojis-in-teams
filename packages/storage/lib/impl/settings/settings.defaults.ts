import { MergeMode, type SettingsData } from './settings.types';

export const DEFAULT_UPDATE_TIME_DELTA = 6 as const;

export const DEFAULT_SETTINGS: SettingsData = {
  isSync: true, // ! Temporary
  mergeMode: MergeMode.ManualFirst,
  lastUpdate: Date.now(),
  updateTimeDelta: DEFAULT_UPDATE_TIME_DELTA,
  lastErrorMessage: undefined,
  sourceUrl: '',
} as const satisfies SettingsData;