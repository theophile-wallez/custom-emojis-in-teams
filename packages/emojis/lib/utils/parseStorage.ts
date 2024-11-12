import { customEmojisStorageSchema, type CustomEmojisStorageMap } from '../schemas/customEmojis.storage.schema';

export const parseStorage = (storage: unknown): CustomEmojisStorageMap => {
  const response = customEmojisStorageSchema.safeParse(storage);
  if (!response.success) {
    throw new Error('Invalid custom emojis storage');
  }
  return response.data;
};
