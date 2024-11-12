import { z } from 'zod';
import { EmojiIdSchema } from './emoji.id.schema';

export const customEmojisStorageSchema = z.record(EmojiIdSchema, z.string().url());
export type CustomEmojisStorageMap = z.infer<typeof customEmojisStorageSchema>;
