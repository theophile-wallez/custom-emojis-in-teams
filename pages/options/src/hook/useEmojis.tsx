import type { EmojiShape } from '@extension/emojis';
import { allEmojis } from '@extension/emojis';
import { useStorage } from '@extension/shared';
import { externalMappingStorage } from '@extension/storage';

export const useEmojis = (): (EmojiShape & { customEmojiSrc?: string })[] => {
  const customEmojiMap = useStorage(externalMappingStorage);
  return allEmojis.map(emoji => ({
    ...emoji,
    customEmojiSrc: customEmojiMap[emoji.id],
  }));
};
