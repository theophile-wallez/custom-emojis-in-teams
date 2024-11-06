import emojiMapping from './emojiMapping.json';
const mapping = emojiMapping as Record<string, string>;

export const findEmojis = () => {
  const validEmojis = Object.keys(mapping);
  const emojisSelector = validEmojis.map(emoji => `[itemid="${emoji}"]`).join(', ');
  const emojis = document.querySelectorAll<HTMLImageElement>(
    `img[itemtype="http://schema.skype.com/Emoji"]${emojisSelector}`,
  );

  if (!emojis?.length) return;

  emojis.forEach(emoji => {
    replaceEmoji(emoji);
  });
};

const replaceEmoji = (emoji: HTMLImageElement) => {
  console.log('emoji: ', emoji);
  const itemId = emoji.getAttribute('itemid');
  if (!itemId) return;
  const customSrc = mapping[itemId];
  if (!customSrc) return;

  emoji.setAttribute('itemid', 'customEmoji');
  emoji.setAttribute('src', customSrc);
  emoji.className = '';
  emoji.setAttribute('style', '');
};
