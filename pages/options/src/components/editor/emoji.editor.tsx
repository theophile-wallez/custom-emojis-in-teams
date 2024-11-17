import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEmoji } from '@src/hook/useEmoji';
import type { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { CustomEmojiEditor } from './editor.schema';
import { customEmojiEditorSchema } from './editor.schema';
import { Input } from '@/components/ui/input';

type Props = PropsWithChildren<{
  emojiId: string;
  isEditMode: boolean;
}>;

export const EmojiEditor = ({ emojiId, isEditMode, children }: Props) => {
  const emoji = useEmoji(emojiId);

  const form = useForm<CustomEmojiEditor>({
    resolver: zodResolver(customEmojiEditorSchema),
    values: {},
  });

  const onSubmit = (data: CustomEmojiEditor) => {
    console.log(data);
  };

  if (!emoji) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className=" flex w-full space-y-2">
            <h1 className="text-[1.5rem] font-medium leading-none">{emoji.alt}</h1>
          </div>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="sourceUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom emoji url</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>The URL to the emoji image.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button type="submit">Add</Button>
                  {isEditMode && <Button variant="destructive">Delete</Button>}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
