import { EmojiFromTo } from '@/components/emojis/emojiFromTo';
import type { CustomEmojiShape } from '@extension/emojis';
import { AddEmoji } from '@src/components/addEmojis/addEmoji';
import { useState } from 'react';
import { useCustomEmojis } from '@src/hook/useCustomEmojis';

export const Mapping = () => {
  const [currentEmojis, setCurrentEmojis] = useState<CustomEmojiShape[] | undefined>();
  const allCustomEmojis = useCustomEmojis(currentEmojis);

  if (!allCustomEmojis) return null;

  const onChange = () => {
    setCurrentEmojis(prev => JSON.parse(JSON.stringify(prev ?? {})));
  };
  return (
    <div className="flex w-full flex-wrap gap-3">
      <AddEmoji />
      {allCustomEmojis.map(emoji => (
        <EmojiFromTo key={emoji.id} emoji={emoji} onChange={onChange} />
      ))}
    </div>
  );
};
