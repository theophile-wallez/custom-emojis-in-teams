import type { MixEmojiShape } from '@extension/emojis';
import { EmojiContainer } from './emoji.container';

type Props = {
  emoji: MixEmojiShape;
};
export const Emoji = ({ emoji }: Props) => {
  return (
    <EmojiContainer>
      <p className="text-center text-[1.4rem]">{emoji?.alt}</p>
    </EmojiContainer>
  );
};
