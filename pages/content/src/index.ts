import { cryptText } from './cryptText';
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

let retry = 0;

async function initMessageObserver() {
  const messageElement = document.querySelector('[data-view^=message-pane-list-viewport]');

  const messageObserver = new MutationObserver(cv => {
    for (const mutation of cv) {
      if (mutation.type === 'childList') {
        cryptText(mutation.target);
      }
    }
  });

  if (!messageElement) {
    if (retry > 3) return;

    setTimeout(() => {
      void initMessageObserver();
      retry++;
    }, 1000);
    return;
  }

  messageObserver.observe(messageElement, {
    childList: true,
    subtree: true
  });
}

let retryReplaceInputBar = 0;

function replaceInputBar() {
  console.log('replaceInputBar');
  const inputBar = document.querySelector('[contenteditable="true"]') as HTMLElement;
  // cerate a new div with the same style as the inputBar
  // above the inputBar
  if (!inputBar) {
    if (retryReplaceInputBar > 10) {
      console.error('Failed to replace input bar');
      return;
    }

    setTimeout(() => {
      void replaceInputBar();
      retryReplaceInputBar++;
    }, 1500);
    return;
  }

  console.log('inputBar', inputBar);

  // create a new div with the same style as the inputBar
  // above the inputBar
  const myInput = document.createElement('div');
  myInput.id = 'myInput';
  myInput.style.position = 'absolute';
  myInput.style.left = `400px`;
  myInput.style.bottom = `90px`;
  myInput.style.width = `500px`;
  myInput.style.height = `40px`;
  myInput.style.zIndex = '9999999';
  myInput.style.backgroundColor = 'red';
  myInput.contentEditable = 'true';
  document.body.appendChild(myInput);

  myInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      console.log('Enter');
      const message = myInput.innerText;
      console.log('message', message);
      inputBar.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'a' }));
    }
  });
}

getMappingStorage().then(response => {
  void initObserver(response);
  setTimeout(() => {
    void initMessageObserver();
  }, 5000);
});

replaceInputBar();
