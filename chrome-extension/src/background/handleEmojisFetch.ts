import 'webextension-polyfill';
import { stateStorage, customEmojiStorage } from '@extension/storage';
import { fetchEmojis } from '@extension/emojis/lib/utils/fetchEmojis';
import { Time } from './types';

export const handleEmojisFetch = async () => {
  const state = await stateStorage.get();

  if (state.source !== 'link' || !state.sourceUrl) return;
  if (!isTimeToFetch(state.lastUpdate, state.updateTimeDelta)) return;
  // ?? process.env.VITE_GITHUB_TOKEN
  await fetchDataAndStore(state.sourceUrl, state.token);
};

const isTimeToFetch = (lastUpdate: number, updateInterval: number) => {
  return Date.now() - lastUpdate >= updateInterval * Time.Hour;
};

const updateLastUpdate = async () => {
  await stateStorage.setProperty('lastUpdate', Date.now());
};

const fetchDataAndStore = async (sourceUrl: string, token?: string) => {
  const response = await fetchEmojis(sourceUrl, token);

  if (response instanceof Error) return;

  await customEmojiStorage.merge(response);
  await updateLastUpdate();
};
