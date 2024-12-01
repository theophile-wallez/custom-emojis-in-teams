import type { MixEmojiShape } from '@extension/emojis';
import { allEmojis } from '@extension/emojis';
import { getFullMappingStorageWithProvider } from '@extension/storage';
import { useEffect, useState } from 'react';

export const useEmojis = (changedData: MixEmojiShape[] | undefined): MixEmojiShape[] | undefined => {
  const [emojis, setEmojis] = useState<MixEmojiShape[] | undefined>(undefined);

  useEffect(() => {
    const fetchEmojis = async () => {
      const fullMapping = await getFullMappingStorageWithProvider();
      setEmojis(
        allEmojis.map(emoji => ({
          ...emoji,
          customEmojiSrc: fullMapping[emoji.id]?.src,
          provider: fullMapping[emoji.id]?.provider
        }))
      );
    };
    void fetchEmojis();
  }, [changedData]);

  return emojis;
};
