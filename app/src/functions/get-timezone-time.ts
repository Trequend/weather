export function getTimezoneTime(time: Date, timezone: number) {
  const copy = new Date(time);
  copy.setMinutes(copy.getMinutes() + copy.getTimezoneOffset());
  copy.setSeconds(copy.getSeconds() + timezone);
  return copy;
}
