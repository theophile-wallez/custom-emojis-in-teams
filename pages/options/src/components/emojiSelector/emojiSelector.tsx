import { useEmojis } from '@/hook/useEmojis';
import { EmojiEditor } from '@/components/editor/emoji.editor';
import { CustomEmoji } from '../emojis/customEmoji';
import type { EmojiShapeWithCustomSrc } from '@extension/emojis';
import { useState } from 'react';

export const EmojiSelector = () => {
  const [currentEmojis, setCurrentEmojis] = useState<EmojiShapeWithCustomSrc[] | undefined>();
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
                <CustomEmoji src={emoji.customEmojiSrc} />{' '}
                <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full border bg-white text-[0.5rem] outline outline-2 outline-white">
                  {emoji.alt ?? 'x'}
                </span>
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
