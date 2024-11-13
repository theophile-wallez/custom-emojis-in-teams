import { customEmojiStorage } from '@extension/storage';

export async function getCustomEmojisStorage() {
  console.log('initial theme:', await customEmojiStorage.get());
  return await customEmojiStorage.get();
}
