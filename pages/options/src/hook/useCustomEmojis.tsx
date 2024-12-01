import type { CustomEmojiShape, EmojiShape } from '@extension/emojis';
import { allEmojis } from '@extension/emojis';
import { getFullMappingStorageWithProvider } from '@extension/storage';
import { useEffect, useState } from 'react';

export const useCustomEmojis = (changedData: CustomEmojiShape[] | undefined): CustomEmojiShape[] | undefined => {
  const [customEmojis, setCustomEmojis] = useState<CustomEmojiShape[] | undefined>(undefined);
  useEffect(() => {
    const getCustomEmojis = async () => {
      const fullMapping = await getFullMappingStorageWithProvider();
      const richEmojis = Object.entries(fullMapping).map(([id, emoji]) => ({
        ...(allEmojis.find(e => e.id === id) as EmojiShape),
        customEmojiSrc: emoji.src,
        provider: emoji.provider
      }));
      setCustomEmojis(richEmojis);
    };
    void getCustomEmojis();
  }, [changedData]);

  return customEmojis;
};
