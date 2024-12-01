import { z } from 'zod';

export const emojiShapeSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string().optional(),
  customEmojiSrc: z.string().url().optional(),
  provider: z.enum(['user', 'external']).optional(),
});

export const customSrcSchema = z.object({
  customEmojiSrc: z.string().url(),
});
export const customEmojiShapeSchema = emojiShapeSchema.merge(customSrcSchema).extend({
  provider: z.enum(['user', 'external']),
});

export const mixEmojisShapeSchema = z.union([emojiShapeSchema, customEmojiShapeSchema]);

export type EmojiShape = z.infer<typeof emojiShapeSchema>;
export type CustomEmojiShape = z.infer<typeof customEmojiShapeSchema>;
export type MixEmojiShape = z.infer<typeof mixEmojisShapeSchema>;
export type CustomEmojiSrc = z.infer<typeof customSrcSchema>;
