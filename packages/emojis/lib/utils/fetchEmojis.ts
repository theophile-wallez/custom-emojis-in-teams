import { customEmojisSchema, type CustomEmojisMap } from '../schemas/customEmojis.storage.schema';

export const fetchEmojis = async (url: string, token?: string): Promise<CustomEmojisMap | Error> => {
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
    const parsedData = customEmojisSchema.safeParse(data);

    return parsedData.data ?? parsedData.error;
  } catch (error: unknown) {
    if (error instanceof Error) return error;
    return new Error('Unknown error while fetching emojis');
  }
};
