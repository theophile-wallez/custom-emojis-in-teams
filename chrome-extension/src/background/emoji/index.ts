import { Time } from '../types';
import { handleEmojisFetch } from '../handleEmojisFetch';
import { isAlarmDefined, createNewAlarm } from '../utils/alarms';

const isFirefox = false;

/**
 * Every hour, the background script will check if it is time to fetch.
 * Chrome uses the alarm API to trigger the fetch while Firefox uses setInterval.
 */
export const initiateEmojiUpdate = async () => {
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
