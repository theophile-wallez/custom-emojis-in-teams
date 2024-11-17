import type { EmojiId } from '@extension/emojis';
import { useEmoji } from '@/hook/useEmoji';
import { EmojiContainer } from './emoji.container';

type Props = {
  id: EmojiId;
};
export const Emoji = ({ id }: Props) => {
  const emoji = useEmoji(id);
  return (
    <EmojiContainer>
      <p className="text-center text-[1.4rem]">{emoji?.alt}</p>
    </EmojiContainer>
  );
};
