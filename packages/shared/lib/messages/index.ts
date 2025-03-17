export enum MessageType {
  ReplaceTextInEditor = 'replaceTextInEditor'
}

export type EncryptedMessage = {
  type: MessageType.ReplaceTextInEditor;
  text: string;
};

export type EncryptedMessageResponse = {
  success: boolean;
};

export type EncryptedMessageCallBack = (
  message: EncryptedMessageResponse,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: EncryptedMessageResponse) => void
) => void;
