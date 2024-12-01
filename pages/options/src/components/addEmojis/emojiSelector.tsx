import { useEmojis } from '@/hook/useEmojis';
import { EmojiEditor } from '@/components/editor/emoji.editor';
import { CustomEmoji } from '../emojis/customEmoji';
import type { MixEmojiShape } from '@extension/emojis';
import { useState } from 'react';
import { Tag } from '../ui/tag';

export const EmojiSelector = () => {
  const [currentEmojis, setCurrentEmojis] = useState<MixEmojiShape[] | undefined>();
  const allEmojis = useEmojis(currentEmojis);

  if (!allEmojis) return null;

  const onChange = () => {
    setCurrentEmojis(prev => JSON.parse(JSON.stringify(prev ?? {})));
  };

  return (
    <section className="flex h-full select-none flex-wrap gap-2 overflow-auto">
      {allEmojis.map(emoji => (
        <EmojiEditor key={emoji.id} emoji={emoji} onChange={onChange}>
          <div
            className="relative flex size-10 cursor-pointer items-center justify-center rounded-md border text-center text-[1.4rem] hover:bg-gray-100"
            key={emoji.id}
            title={emoji.id}>
            {emoji.customEmojiSrc ? (
              <>
                <CustomEmoji src={emoji.customEmojiSrc} />
                <Tag>{emoji.alt ?? 'x'}</Tag>
              </>
            ) : (
              (emoji.alt ?? 'x')
            )}
          </div>
        </EmojiEditor>
      ))}
    </section>
  );
};
