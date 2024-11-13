import { z } from 'zod';
import { EmojiIdSchema } from './emoji.id.schema';

export const customEmojisSchema = z.record(EmojiIdSchema, z.string().url());
export type CustomEmojisMap = z.infer<typeof customEmojisSchema>;
