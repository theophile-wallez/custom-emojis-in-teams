import { initMessageObserver, replaceInputBar } from './encryption';
import { findAndReplaceEmojis } from './findEmojis';
import { getMappingStorage } from '@extension/storage';

console.log('Custom emojis extension loaded');

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
  setTimeout(() => {
    void initMessageObserver();
  }, 5000);
});

replaceInputBar();
