import { z } from 'zod';
import { EmojiIdSchema } from './emoji.id.schema';

export const customEmojisStoreSchema = z.record(EmojiIdSchema, z.string().url());
export type CustomEmojisStoreMap = z.infer<typeof customEmojisStoreSchema>;

export type Provider = 'user' | 'external';
export type CustomEmojiMapWithProvider = Record<
  string,
  {
    src: string;
    provider: Provider;
  }
>;
