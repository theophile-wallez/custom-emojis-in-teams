import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { EmojiSelector } from './emojiSelector';

export const AddEmoji = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-[105px] gap-1">
          <Plus strokeWidth={1.5} /> Add emoji
        </Button>
      </DialogTrigger>
      <DialogContent className="m-4 h-[calc(100%-6rem)] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select an emoji</DialogTitle>
          <DialogDescription>Pick an emoji and assign a custom emoji url to it.</DialogDescription>
        </DialogHeader>
        <EmojiSelector />
      </DialogContent>
    </Dialog>
  );
};
