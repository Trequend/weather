export function formatDeltaTime(date: Date, otherDate: Date) {
  const delta = otherDate.getTime() - date.getTime();
  const hours = Math.floor(delta / 1000 / 60 / 60);
  const minutes = Math.floor(delta / 1000 / 60) - hours * 60;
  if (hours === 0) {
    return `${minutes}M`;
  } else {
    return `${hours}H ${minutes}M`;
  }
}
