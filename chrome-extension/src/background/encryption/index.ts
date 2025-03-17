// import { ENCRYPTED_DELIMITER } from '@extension/shared';
export const placeTextInEditor = (text: string): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0]?.id;
    if (!tabId) {
      console.log('tabId not found');
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      world: 'MAIN',
      func: setEditorContent,
      args: [text]
    });
  });
};

const setEditorContent = (response: string): void => {
  const ckEditorDomElement = document.querySelector('.ck-editor__editable');
  if (!ckEditorDomElement) {
    console.error('The "ck-editor__editable" element was not found in the DOM.');
    return;
  }

  if (!('ckeditorInstance' in ckEditorDomElement)) {
    console.error('The "ckeditorInstance" property was not found in the DOM.');
    return;
  }

  const ckeditor = ckEditorDomElement.ckeditorInstance as CKEDITOR.editor | undefined;

  if (!ckeditor || !('setData' in ckeditor) || !ckeditor.setData) {
    console.error('The "ckeditorInstance" property was not found in the DOM.');
    return;
  }
  const ENCRYPTED_DELIMITER = '_crypt_';

  const data = `<p>${ENCRYPTED_DELIMITER}${response}${ENCRYPTED_DELIMITER}</p>`;
  ckeditor.setData(data);
};
