import 'webextension-polyfill';
import { stateStorage, customEmojiStorage } from '@extension/storage';
import { fetchEmojis } from '@extension/emojis/lib/utils/fetchEmojis';

enum Time {
  Second = 1000,
  Minute = 60 * Second,
  Hour = 60 * Minute,
}

setInterval(async () => {
  const state = await stateStorage.get();

  if (state.source !== 'link' || !state.sourceUrl) return;
  if (!isTimeToFetch(state.lastUpdate, state.updateTimeDelta)) return;

  await fetchDataAndStore(state.sourceUrl, state.token ?? process.env.VITE_GITHUB_TOKEN);
}, 1 * Time.Hour);

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
