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

const selector = '[id^=content-]';

export const processText = async (el: HTMLElement) => {
  const text = el.querySelectorAll(selector);

  text.forEach(async t => {
    const text = t.textContent;
    if (!text) return;

    if (text.includes('_crypt_')) {
      const data = text.split('_crypt_')[1];
      if (!data) return;

      try {
        const clearMessage = await decryptText(data);
        t.innerHTML = `<p style="font-style: italic;">${clearMessage}</p>`;
      } catch (error) {
        console.error('error', error);
        t.innerHTML = `<p style="color: red;">error decrypting message</p>`;
      }
    } else {
      return;
    }
  });
};

async function initMessageObserver() {
  const messageElement = document.querySelector('[data-view^=message-pane-list-viewport]');

  const messageObserver = new MutationObserver(async cv => {
    for (const mutation of cv) {
      if (mutation.type === 'childList') {
        await processText(mutation.target as HTMLElement);
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

  // create a new div with the same style as the inputBar
  // above the inputBar
  const myInput = document.createElement('input');
  myInput.id = 'myInput';
  myInput.style.position = 'absolute';
  myInput.style.left = `400px`;
  myInput.style.bottom = `32px`;
  myInput.style.width = `500px`;
  myInput.style.height = `30px`;
  myInput.style.zIndex = '9999999';
  myInput.style.border = 'none';
  myInput.style.backgroundColor = 'white';
  myInput.placeholder = 'crypted message here';
  myInput.style.padding = '10px';
  document.body.appendChild(myInput);

  myInput.addEventListener('keydown', async e => {
    if (e.key === 'Enter') {
      const text = myInput.value;
      const encrypted = await cryptText(text);
      chrome.runtime.sendMessage({ type: 'replaceTextInEditor', text: encrypted });
      await new Promise(resolve => setTimeout(resolve, 300));
      const button = document.querySelector('[data-tid^=sendMessageCommands-send]');
      if (button) {
        (button as HTMLElement).click();
      }
      myInput.value = '';
    }
  });
}

// 128 bits
const passphrase = 'AAAAAAAAAAAAAAAAAAAAAA==';
const decryptedPassphrase = atob(passphrase);

let key: CryptoKey;

async function decryptText(text: string) {
  if (!key) {
    key = await window.crypto.subtle.importKey('raw', new TextEncoder().encode(decryptedPassphrase), 'AES-GCM', false, [
      'encrypt',
      'decrypt'
    ]);
  }

  const decodedData = atob(text);
  const buffer = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; i++) {
    buffer[i] = decodedData.charCodeAt(i);
  }

  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, buffer);

  const decryptedString = String.fromCharCode(...new Uint8Array(decrypted));

  return decryptedString;
}

async function cryptText(text: string) {
  if (!key) {
    key = await window.crypto.subtle.importKey('raw', new TextEncoder().encode(decryptedPassphrase), 'AES-GCM', false, [
      'encrypt',
      'decrypt'
    ]);
  }

  const buffer = new TextEncoder().encode(text);

  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, buffer);

  const encryptedString = String.fromCharCode(...new Uint8Array(encrypted));
  const base64EncryptedString = btoa(encryptedString);

  return base64EncryptedString;
}
getMappingStorage().then(response => {
  void initObserver(response);
  setTimeout(() => {
    void initMessageObserver();
  }, 5000);
});

replaceInputBar();
