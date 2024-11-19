import { findEmojis } from './findEmojis';
import { getMappingStorage } from '@extension/storage';

console.log('content script loaded');

async function initObserver(emojisMap: Record<string, string>) {
  const bodyObserver = new MutationObserver(() => {
    findEmojis(emojisMap);
  });

  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

getMappingStorage().then(response => {
  void initObserver(response);
});

// TODO: Remove
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('changes: ', changes);
  console.log('namespace: ', namespace);
});
