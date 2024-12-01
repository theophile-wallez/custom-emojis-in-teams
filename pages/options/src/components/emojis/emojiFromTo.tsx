import type { CustomEmojiShape } from '@extension/emojis';
import { Emoji } from '@/components/emojis/emoji';
import { CustomEmoji } from './customEmoji';
import { EmojiEditor } from '../editor/emoji.editor';
import { Tag } from '@/components/ui/tag';
import { Cloudy, User } from 'lucide-react';

type Props = {
  emoji: CustomEmojiShape;
  onChange: () => void;
};
export const EmojiFromTo = ({ emoji, onChange }: Props) => {
  return (
    <EmojiEditor emoji={emoji} onChange={onChange}>
      <div className="relative flex h-10 w-[105px] shrink-0 grow-0 cursor-pointer select-none items-center gap-1 rounded-md border hover:bg-gray-100">
        <Emoji emoji={emoji} />
        <p className="text-center text-[1.2rem] text-gray-700">➜</p>
        <CustomEmoji src={emoji.customEmojiSrc} />
        <Tag className="text-gray-400">
          {emoji.provider === 'user' ? <User size={12} strokeWidth={2} /> : <Cloudy size={12} strokeWidth={2} />}
        </Tag>
      </div>
    </EmojiEditor>
  );
};
