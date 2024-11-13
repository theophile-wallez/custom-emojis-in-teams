import { customEmojisSchema, type CustomEmojisMap } from 'lib/schemas';

export const fetchEmojis = async (): Promise<CustomEmojisMap | Error> => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/microsoft/Emoji/master/data/emoji.json');
    const data: unknown = await response.json();

    const parsedData = customEmojisSchema.safeParse(data);
    return parsedData.data ?? parsedData.error;
  } catch (error: unknown) {
    if (error instanceof Error) return error;
    return new Error('Unknown error while fetching emojis');
  }
};
