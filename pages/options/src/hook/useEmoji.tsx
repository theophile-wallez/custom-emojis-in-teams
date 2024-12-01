import type { EmojiId, EmojiShape } from '@extension/emojis';
import { allEmojis } from '@extension/emojis';
// import { getFullMappingStorage } from '@extension/storage';

export const useEmoji = (id: EmojiId | string): EmojiShape | undefined => {
  // const fullMapping = getFullMappingStorage();
  const emoji = allEmojis.find(emoji => emoji.id === id);
  return emoji;
};
