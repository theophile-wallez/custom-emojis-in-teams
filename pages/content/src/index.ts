import { toggleTheme } from '@src/toggleTheme';
import { findEmojis } from './findEmojis';
import { getMappingStorage } from '@extension/storage';

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
getMappingStorage().then(response => {
  void initObserver(response);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('changes: ', changes);
  console.log('namespace: ', namespace);
});

void toggleTheme();
