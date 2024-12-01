import { customEmojisStoreSchema, type CustomEmojisStoreMap } from '../schemas/customEmojis.storage.schema';

export const parseStorage = (storage: unknown): CustomEmojisStoreMap => {
  const response = customEmojisStoreSchema.safeParse(storage);
  if (!response.success) {
    throw new Error('Invalid custom emojis storage');
  }
  return response.data;
};
