import { findAndReplaceEmojis } from './findEmojis';
import { getMappingStorage } from '@extension/storage';

console.log('Custom emojisloaded');

async function initObserver(emojisMap: Record<string, string>) {
  const bodyObserver = new MutationObserver(() => {
    findAndReplaceEmojis(emojisMap);
  });

  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true
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
