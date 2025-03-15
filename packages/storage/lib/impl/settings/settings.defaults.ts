import type { SettingsData } from '.';

export const DEFAULT_UPDATE_TIME_DELTA = 6 as const;

export const DEFAULT_SETTINGS: SettingsData = {
  isSync: false,
  mergeMode: 'manualFirst',
  lastUpdate: Date.now(),
  updateTimeDelta: DEFAULT_UPDATE_TIME_DELTA,
  lastErrorMessage: undefined,
  sourceUrl: '',
  canCrypt: false,
  password: undefined
} as const satisfies SettingsData;
