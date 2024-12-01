import type { EmojiShapeWithCustomSrc } from '@extension/emojis';
import { allEmojis } from '@extension/emojis';
import { getFullMappingStorage } from '@extension/storage';
import { useEffect, useState } from 'react';

export const useEmojis = (
  changedData: EmojiShapeWithCustomSrc[] | undefined,
): EmojiShapeWithCustomSrc[] | undefined => {
  const [emojis, setEmojis] = useState<EmojiShapeWithCustomSrc[] | undefined>(undefined);

  useEffect(() => {
    const fetchEmojis = async () => {
      const fullMapping = await getFullMappingStorage();
      console.log('fullMapping: ', fullMapping);
      setEmojis(
        allEmojis.map(emoji => ({
          ...emoji,
          customEmojiSrc: fullMapping[emoji.id],
        })),
      );
    };
    void fetchEmojis();
  }, [changedData]);

  return emojis;
};
