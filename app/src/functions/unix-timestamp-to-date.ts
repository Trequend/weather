import { getTimezoneTime } from './get-timezone-time';

export function unixTimestampToDate(unixTimestamp: number, timezone: number) {
  const date = new Date(unixTimestamp * 1000);
  return getTimezoneTime(date, timezone);
}
