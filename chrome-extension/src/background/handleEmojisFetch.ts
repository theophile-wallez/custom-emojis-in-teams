import 'webextension-polyfill';
import { settingsStorage, fetchDataAndStoreIt } from '@extension/storage';
import { ALARM_NAME } from './constants';
import { Time } from './types';

export const handleEmojisFetch = async (alarm?: chrome.alarms.Alarm) => {
  if (alarm && alarm.name !== ALARM_NAME) return;

  const state = await settingsStorage.get();

  if (state.isSync === false || !state.sourceUrl) return;
  if (!isTimeToFetch(state.lastUpdate, state.updateTimeDelta)) return;
  await fetchDataAndStoreIt();
};

const isTimeToFetch = (lastUpdate: number, updateInterval: number) => {
  return Date.now() - lastUpdate >= updateInterval * Time.Hour;
};
