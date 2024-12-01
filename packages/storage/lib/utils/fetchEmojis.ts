import type { CustomEmojisStoreMap } from '@extension/emojis';
import { customEmojisStoreSchema } from '@extension/emojis';

export const fetchEmojis = async (url: string, token?: string): Promise<CustomEmojisStoreMap | Error> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `token ${token}` } : {})
    };

    const response = await fetch(url, {
      cache: 'no-cache',
      method: 'GET',
      headers: headers
    });
    // if the response is not ok, check if it's a text error
    if (!response.ok) {
      const text = await response.text();
      return new Error(`fetch error: ${text}`);
    }
    const data: unknown = await response.json();
    const parsedData = customEmojisStoreSchema.safeParse(data);

    return parsedData.data ?? parsedData.error;
  } catch (error: unknown) {
    if (error instanceof Error) return error;
    return new Error('Unknown error while fetching emojis');
  }
};
