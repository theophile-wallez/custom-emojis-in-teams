export const findAndReplaceEmojis = (emojisMap: Record<string, string> = {}) => {
  const validEmojis = Object.keys(emojisMap);

  const emojisSelector = validEmojis.map(emoji => `[itemid="${emoji}"]`).join(', ');
  const emojiElements = document.querySelectorAll<HTMLImageElement>(
    `img[itemtype="http://schema.skype.com/Emoji"]${emojisSelector}`
  );

  if (!emojiElements?.length) return;
  console.log('emojiElements: ', emojiElements);
  console.log('validEmojis: ', validEmojis);

  emojiElements.forEach(emoji => {
    replaceEmoji(emojisMap, emoji);
  });
};

const replaceEmoji = (emojisMap: Record<string, string>, element: HTMLImageElement) => {
  const itemId = element.getAttribute('itemid');
  if (!itemId) return;
  const customSrc = emojisMap[itemId];
  if (!customSrc) return;

  if (element.children.length > 0) {
    element.children[0].setAttribute('itemid', `customEmoji-${itemId}`);
    element.children[0].setAttribute('src', customSrc);
    element.children[0].className = '';
    element.children[0].setAttribute('style', '');
    return;
  }

  element.setAttribute('itemid', `customEmoji-${itemId}`);
  element.setAttribute('src', customSrc);
  element.className = '';
  element.setAttribute('style', '');
};
