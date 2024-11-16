import 'webextension-polyfill';
import { Time } from './types';
import { handleEmojisFetch } from './handleEmojisFetch';
import { ALARM_NAME } from './constants';
import { isAlarmDefined, createNewAlarm } from './utils/alarms';

const isFirefox = false;

/**
 * Every hour, the background script will check if it is time to fetch.
 * If the alarm is not defined, it will create a new one.
 */
const init = async () => {
  if (isFirefox) {
    console.log('isFirefox: ', isFirefox);
    setInterval(async () => {
      await handleEmojisFetch();
    }, 1 * Time.Hour);
  } else {
    if (!(await isAlarmDefined())) {
      console.log('createNewAlarm');
      createNewAlarm();
    }

    chrome.alarms.onAlarm.addListener(async alarm => {
      console.log('alarm: ', alarm);
      if (alarm.name !== ALARM_NAME) return;
      await handleEmojisFetch();
    });
  }
};

void init();
