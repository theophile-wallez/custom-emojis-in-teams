import { customEmojisStoreSchema, type CustomEmojisStoreMap } from '../schemas/customEmojis.storage.schema';

export const fetchEmojis = async (url: string, token?: string): Promise<CustomEmojisStoreMap | Error> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `token ${token}` } : {}),
    };

    const response = await fetch(url, {
      cache: 'no-cache',
      method: 'GET',
      headers: headers,
    });

    const data: unknown = await response.json();
    const parsedData = customEmojisStoreSchema.safeParse(data);

    return parsedData.data ?? parsedData.error;
  } catch (error: unknown) {
    if (error instanceof Error) return error;
    return new Error('Unknown error while fetching emojis');
  }
};
