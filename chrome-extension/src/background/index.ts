import 'webextension-polyfill';
import { Time } from './types';
import { handleEmojisFetch } from './handleEmojisFetch';
import { isAlarmDefined, createNewAlarm } from './utils/alarms';
import AES from 'crypto-js/aes';

const isFirefox = false;

/**
 * Every hour, the background script will check if it is time to fetch.
 * Chrome uses the alarm API to trigger the fetch while Firefox uses setInterval.
 */
const initiate = async () => {
  if (isFirefox) {
    setInterval(async () => {
      await handleEmojisFetch();
    }, 1 * Time.Hour);
  } else {
    const isAlarmSet = await isAlarmDefined();
    if (!isAlarmSet) await createNewAlarm();

    chrome.alarms.onAlarm.addListener(async alarm => {
      await handleEmojisFetch(alarm);
    });
  }
};

async function setEditorContent(response: string) {
  const domElement = document.querySelector('.ck-editor__editable');
  if (!domElement) {
    console.log('domElement not found');
    return;
  }

  // @ts-ignore
  const editor = domElement.ckeditorInstance;
  if (editor) {
    editor.setData('<p>_crypt_' + response + '_crypt_</p>');
  } else {
    console.log("Couldn't find the editor instance");
    console.log('Response: ' + response);
  }
}

function replaceTextInEditor(text: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;
    if (!tabId) {
      console.log('tabId not found');
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      world: 'MAIN', //undefined for Firefox?
      func: setEditorContent,
      args: [text]
    });
  });
}

void initiate();

console.log('background script loaded');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  if (message.type === 'replaceTextInEditor') {
    console.log('replaceTextInEditor', message.text);
    replaceTextInEditor(message.text);
    sendResponse({ success: true });
  }
});
