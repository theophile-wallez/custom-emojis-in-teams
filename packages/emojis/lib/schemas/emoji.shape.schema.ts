import { z } from 'zod';

export const emojiShapeSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string().optional(),
});

export const customEmojiShapeSchema = emojiShapeSchema.extend({
  customEmojiSrc: z.string().optional(),
});

export type EmojiShape = z.infer<typeof emojiShapeSchema>;
export type EmojiShapeWithCustomSrc = z.infer<typeof customEmojiShapeSchema>;
