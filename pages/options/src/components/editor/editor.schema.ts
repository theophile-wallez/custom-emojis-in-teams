import { z } from 'zod';

export const customEmojiEditorSchema = z.object({
  sourceUrl: z.string().url('This field must be a valid URL')
});

export type CustomEmojiEditor = z.infer<typeof customEmojiEditorSchema>;
