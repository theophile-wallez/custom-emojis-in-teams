import { ALARM_NAME, UPDATE_TIME_DELTA } from '../constants';

export const isAlarmDefined = async (): Promise<boolean> => {
  const currentAlarm = await chrome.alarms.get(ALARM_NAME);
  console.log('isAlarmDefined: ', !!currentAlarm, ALARM_NAME);
  return !!currentAlarm;
};

export const createNewAlarm = async (): Promise<void> => {
  console.log('Creating new alarm', ALARM_NAME, UPDATE_TIME_DELTA);
  return chrome.alarms.create(ALARM_NAME, {
    periodInMinutes: UPDATE_TIME_DELTA,
  });
};
