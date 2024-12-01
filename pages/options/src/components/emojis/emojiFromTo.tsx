import type { CustomEmojiShape } from '@extension/emojis';
import { Emoji } from '@/components/emojis/emoji';
import { CustomEmoji } from './customEmoji';
import { EmojiEditor } from '../editor/emoji.editor';

type Props = {
  emoji: CustomEmojiShape;
  onChange: () => void;
};
export const EmojiFromTo = ({ emoji, onChange }: Props) => {
  return (
    <EmojiEditor emoji={emoji} onChange={onChange}>
      <div className="flex h-10 w-[105px] shrink-0 grow-0 items-center gap-1 rounded-md border">
        <Emoji emoji={emoji} />
        <p className="text-center text-[1.2rem] text-gray-700">➜</p>
        <CustomEmoji src={emoji.customEmojiSrc} />
      </div>
    </EmojiEditor>
  );
};
