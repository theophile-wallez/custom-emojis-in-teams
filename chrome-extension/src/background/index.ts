import 'webextension-polyfill';
import { placeTextInEditor } from './encryption';
import { initiateEmojiUpdate } from './emoji';
import { MessageType, type EncryptedMessage, type EncryptedMessageResponse } from '@extension/shared';

void initiateEmojiUpdate();

chrome.runtime.onMessage.addListener(
  (message: EncryptedMessage, _sender, sendResponse: (response: EncryptedMessageResponse) => void) => {
    console.log('message: ', message);
    if (message.type === MessageType.ReplaceTextInEditor) {
      console.log('replaceTextInEditor');
      placeTextInEditor(message.text);
      sendResponse({ success: true });
    }
  }
);

console.log('Background script loaded');
