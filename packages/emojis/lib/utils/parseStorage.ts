import { customEmojisSchema, type CustomEmojisMap } from '../schemas/customEmojis.storage.schema';

export const parseStorage = (storage: unknown): CustomEmojisMap => {
  const response = customEmojisSchema.safeParse(storage);
  if (!response.success) {
    throw new Error('Invalid custom emojis storage');
  }
  return response.data;
};
