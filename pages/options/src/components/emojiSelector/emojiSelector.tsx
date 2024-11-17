import { useEmojis } from '@/hook/useEmojis';
import { EmojiEditor } from '@/components/editor/emoji.editor';

export const EmojiSelector = () => {
  const allEmojis = useEmojis();
  return (
    <section className="flex h-full select-none flex-wrap gap-2 overflow-auto">
      {allEmojis.map(emoji => (
        <EmojiEditor key={emoji.id} emojiId={emoji.id} canDelete={false}>
          <div
            className="flex size-10 cursor-pointer items-center justify-center rounded-md border text-center text-[1.4rem] hover:bg-gray-100"
            key={emoji.id}
            title={emoji.id}>
            {emoji.alt ?? 'x'}
          </div>
        </EmojiEditor>
      ))}
    </section>
  );
};
