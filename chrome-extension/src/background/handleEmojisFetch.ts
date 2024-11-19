import 'webextension-polyfill';
import { settingsStorage, externalMappingStorage } from '@extension/storage';
import { fetchEmojis } from '@extension/emojis/lib/utils/fetchEmojis';
import { Time } from './types';
import { ALARM_NAME } from './constants';

export const handleEmojisFetch = async (alarm?: chrome.alarms.Alarm) => {
  if (alarm && alarm.name !== ALARM_NAME) return;

  const state = await settingsStorage.get();

  if (state.isSync === false || !state.sourceUrl) return;
  // if (!isTimeToFetch(state.lastUpdate, state.updateTimeDelta)) return;
  await fetchDataAndStore(state.sourceUrl, state.token);
};

const isTimeToFetch = (lastUpdate: number, updateInterval: number) => {
  return Date.now() - lastUpdate >= updateInterval * Time.Hour;
};

const updateLastUpdate = async () => {
  await settingsStorage.setProperty('lastUpdate', Date.now());
};

const fetchDataAndStore = async (sourceUrl: string, token?: string) => {
  const response = await fetchEmojis(sourceUrl, token);

  if (response instanceof Error) {
    console.error('Error fetching emojis: ', response.message);
    return; // TODO: Store and display error
  }

  await updateLastUpdate();

  if (Object.keys(response).length === 0) return;
  await externalMappingStorage.set(response);
};
