import { allEmojis } from '../data/emojis/index';
import { z } from 'zod';

const emojiIds = allEmojis.map(emoji => emoji.id);
export const EmojiIdSchema = z.enum(emojiIds as [(typeof emojiIds)[number], ...(typeof emojiIds)[number][]]);
export type EmojiId = z.infer<typeof EmojiIdSchema>;
