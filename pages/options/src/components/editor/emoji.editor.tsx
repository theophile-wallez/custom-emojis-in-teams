/* eslint-disable tailwindcss/no-custom-classname */
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { customSrcSchema, type CustomEmojiSrc, type MixEmojiShape } from '@extension/emojis';
import { userMappingStorage } from '@extension/storage/lib/impl/user.mapping.storage';

type Props = PropsWithChildren<{
  emoji: MixEmojiShape;
  onChange: () => void;
}>;

export const EmojiEditor = ({ emoji, children, onChange }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const form = useForm<CustomEmojiSrc>({
    resolver: zodResolver(customSrcSchema),
    values: {
      customEmojiSrc: emoji.provider === 'user' ? emoji.customEmojiSrc! : ''
    }
  });

  const onSubmit = (data: CustomEmojiSrc) => {
    if (!data.customEmojiSrc) return;
    userMappingStorage.addOrUpdateEmojiById(emoji.id, data.customEmojiSrc);
    onChange();
    setIsPopoverOpen(false);
  };

  const onDelete = async () => {
    await userMappingStorage.removeById(emoji.id);
    onChange();
    setIsPopoverOpen(false);
    form.reset();
  };

  if (!emoji) return null;

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className=" flex w-full items-center gap-4">
            <h1 className="text-[1.5rem] font-medium leading-none">{emoji.alt}</h1>
            {emoji.provider && (
              <p className="text-muted-foreground text-sm">
                {emoji.provider === 'user' ? 'Set by you' : 'Set by external source'}
              </p>
            )}
          </div>
          <div className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="customEmojiSrc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom emoji url</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={emoji.provider === 'user' ? 'https://' : (emoji.customEmojiSrc ?? 'https://...')}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>The URL to the emoji image.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button type="submit" disabled={!form.formState.isValid}>
                    {emoji.customEmojiSrc ? 'Update' : 'Add'}
                  </Button>
                  {emoji.customEmojiSrc && emoji.provider === 'user' && (
                    <Button type="reset" onClick={onDelete} variant="destructive">
                      Delete
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
