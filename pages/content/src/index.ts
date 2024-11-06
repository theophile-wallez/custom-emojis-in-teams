import { toggleTheme } from '@src/toggleTheme';
import { findEmojis } from './findEmojis';

console.log('content script loaded');

// Function to count divs and observe DOM changes
function initObserver() {
  const bodyObserver = new MutationObserver(() => {
    findEmojis();
  });

  // Start observing the document with configured parameters
  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

initObserver();

void toggleTheme();
