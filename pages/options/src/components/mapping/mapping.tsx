import { useStorage } from '@extension/shared';
import { externalMappingStorage } from '@extension/storage';
import { EmojiFromTo } from '@/components/emojis/emojiFromTo';
import type { EmojiId } from '@extension/emojis';
import { EmojiDialog } from '@/components/emojiSelector/emojiDialog';
import { EmojiEditor } from '@/components/editor/emoji.editor';

export const Mapping = () => {
  const emojiStorage = useStorage(externalMappingStorage);
  return (
    <div className="flex w-full select-none flex-wrap gap-3">
      <EmojiDialog />
      {Object.entries(emojiStorage).map(([fromId, toSrc]) => (
        <EmojiEditor key={fromId} emoji={{ id: fromId, src: toSrc }} onChange={() => {}}>
          <EmojiFromTo fromId={fromId as EmojiId} toSrc={toSrc} />
        </EmojiEditor>
      ))}
    </div>
  );
};
