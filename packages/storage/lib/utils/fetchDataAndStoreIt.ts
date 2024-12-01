import { settingsStorage, externalMappingStorage, userMappingStorage } from '../impl';
import { fetchEmojis } from './fetchEmojis';

export const fetchDataAndStoreIt = async (shouldUpdateLastUpdate: boolean = true) => {
  const settings = await settingsStorage.get();
  if (!settings.sourceUrl) return;
  const response = await fetchEmojis(settings.sourceUrl, settings.token);

  if (response instanceof Error) {
    console.error('Error fetching emojis: ', response.message);
    return; // TODO: Store and display error
  }

  if (shouldUpdateLastUpdate) {
    await updateLastUpdate();
  }

  if (Object.keys(response).length === 0) return;

  await updateStore(response);
};

const updateStore = async (emojisMap: Record<string, string>) => {
  await externalMappingStorage.set(emojisMap);
  await cleanUserStorage(emojisMap);
};

/**
 * If the user updates it's own emojis to his external storage, then we remove them from the user storage.
 */
const cleanUserStorage = async (emojisMap: Record<string, string>) => {
  const userStorage = await userMappingStorage.get();

  const idsToRemove: string[] = [];
  console.log('idsToRemove: ', idsToRemove);

  Object.entries(userStorage).map(([id, src]) => {
    if (emojisMap[id] && emojisMap[id] === src) idsToRemove.push(id);
  });

  if (idsToRemove.length > 0) {
    await userMappingStorage.removeByIds(idsToRemove);
  }
};

const updateLastUpdate = async () => {
  await settingsStorage.setProperty('lastUpdate', Date.now());
};
