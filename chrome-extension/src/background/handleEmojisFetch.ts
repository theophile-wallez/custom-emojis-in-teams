import 'webextension-polyfill';
import { settingsStorage, fetchDataAndStoreIt } from '@extension/storage';
import { ALARM_NAME } from './constants';

export const handleEmojisFetch = async (alarm?: chrome.alarms.Alarm) => {
  if (alarm && alarm.name !== ALARM_NAME) return;

  const state = await settingsStorage.get();

  if (state.isSync === false || !state.sourceUrl) return;
  await fetchDataAndStoreIt();
};
