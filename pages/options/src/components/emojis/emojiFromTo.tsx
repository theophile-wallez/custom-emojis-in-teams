import type { EmojiId } from '@extension/emojis';
import { Emoji } from '@/components/emojis/emoji';
import { CustomEmoji } from './customEmoji';

type Props = {
  fromId: EmojiId;
  toSrc: string;
};
export const EmojiFromTo = ({ fromId, toSrc }: Props) => {
  return (
    <div className="flex h-10 w-[105px] shrink-0 grow-0 items-center gap-1 rounded-md border">
      <Emoji id={fromId} />
      <p className="text-center text-[1.2rem] text-gray-700">➜</p>
      <CustomEmoji src={toSrc} />
    </div>
  );
};
