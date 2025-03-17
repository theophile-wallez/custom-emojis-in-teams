import type { EncryptedMessage, EncryptedMessageResponse } from '@extension/shared';
import { ENCRYPTED_DELIMITER, MessageType } from '@extension/shared';

let retry = 0;

const selector = '[id^=content-]';

export const processText = async (el: HTMLElement) => {
  const messageElements = el.querySelectorAll(selector);

  messageElements.forEach(async messageElement => {
    // Check if element has _crypt_ tags
    const html = messageElement.innerHTML;
    if (!html.includes('_crypt_')) return;

    // Use regex to find all encrypted text between _crypt_ tags
    const regex = /_crypt_(.*?)_crypt_/g;
    let newHtml = html;

    // Replace each encrypted text while preserving other elements
    const matches = html.match(regex);
    if (!matches) return;
    for (const match of matches) {
      const encryptedText = match.replace(/_crypt_/g, '');
      const clearMessage = await decryptText(encryptedText);

      const decryptedText = `<i title="Encrypted message: ${encryptedText}">${clearMessage}</i>`;
      newHtml = newHtml.replace(match, decryptedText);
      messageElement.id = 'decrypted-message';
    }

    messageElement.innerHTML = newHtml;
  });
};

export async function initMessageObserver() {
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

export function replaceInputBar() {
  const inputBar = document.querySelector('[contenteditable="true"]') as HTMLElement;
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

  const footer = document.querySelector('[data-tid="message-pane-footer"]');
  if (!footer) return;

  const myInput = document.createElement('input');
  myInput.id = 'myInput';
  myInput.classList.add('crypted-input');
  myInput.placeholder = 'Enter your secret message here 👻';

  footer.insertBefore(myInput, footer.firstChild);

  myInput.addEventListener('keydown', async e => {
    if (e.key === 'Enter') {
      const text = myInput.value;
      const encrypted = await cryptText(text);
      const response = await chrome.runtime.sendMessage<EncryptedMessage, EncryptedMessageResponse>({
        type: MessageType.ReplaceTextInEditor,
        text: encrypted
      });
      console.log(response.success);
      // const button = document.querySelector('[data-tid^=sendMessageCommands-send]');
      // if (button) {
      //   (button as HTMLElement).click();
      // }
      myInput.value = '';
    }
  });
}

// 128 bits
const passphrase = 'AAAAAAAAAAAAAAAAAAAAAA==';
const decryptedPassphrase = atob(passphrase);

let key: CryptoKey;

const decryptText = async (text: string) => {
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

  return String.fromCharCode(...new Uint8Array(decrypted));
};

const cryptText = async (text: string) => {
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
};
