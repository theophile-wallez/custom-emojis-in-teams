import type { EmojiId } from '@extension/emojis';
import { allEmojis } from '@extension/emojis';

export const useEmoji = (id: EmojiId | string) => {
  return allEmojis.find(emoji => emoji.id === id);
};
