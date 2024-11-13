export const findEmojis = (emojisMap: Record<string, string> = {}) => {
  const validEmojis = Object.keys(emojisMap);
  const emojisSelector = validEmojis.map(emoji => `[itemid="${emoji}"]`).join(', ');
  const emojis = document.querySelectorAll<HTMLImageElement>(
    `img[itemtype="http://schema.skype.com/Emoji"]${emojisSelector}`,
  );

  if (!emojis?.length) return;

  emojis.forEach(emoji => {
    replaceEmoji(emojisMap, emoji);
  });
};

const replaceEmoji = (emojisMap: Record<string, string>, emoji: HTMLImageElement) => {
  const itemId = emoji.getAttribute('itemid');
  if (!itemId) return;
  const customSrc = emojisMap[itemId];
  if (!customSrc) return;

  emoji.setAttribute('itemid', 'customEmoji');
  emoji.setAttribute('src', customSrc);
  emoji.className = '';
  emoji.setAttribute('style', '');
};
