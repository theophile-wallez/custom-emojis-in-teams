import { toggleTheme } from '@src/toggleTheme';
import { getCustomEmojisStorage } from '@src/getCustomEmojisStorage';
import { findEmojis } from './findEmojis';

console.log('content script loaded');

// Function to count divs and observe DOM changes
async function initObserver(emojisMap: Record<string, string>) {
  const bodyObserver = new MutationObserver(() => {
    findEmojis(emojisMap);
  });

  // Start observing the document with configured parameters
  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
getCustomEmojisStorage().then(res => {
  console.log('res: ', res);
  void initObserver(res);
});

void toggleTheme();
