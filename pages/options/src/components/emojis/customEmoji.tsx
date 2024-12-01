import { EmojiContainer } from './emoji.container';

type Props = {
  src: string;
};
export const CustomEmoji = ({ src }: Props) => {
  return (
    <EmojiContainer>
      <img src={src} loading="lazy" alt="custom emoji" draggable={false} />
    </EmojiContainer>
  );
};
