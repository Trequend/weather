export function formatDeltaTime(date: Date, otherDate: Date) {
  const delta = otherDate.getTime() - date.getTime();
  const hours = Math.floor(delta / 1000 / 60 / 60);
  const minutes = Math.ceil(delta / 1000 / 60) - hours * 60;
  return `${hours}H ${minutes}M`;
}
