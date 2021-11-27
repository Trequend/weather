import { getTimezoneTime } from './get-timezone-time';

export function getIconSrc(weatherIcon: string): string;
export function getIconSrc(
  weatherIcon: string,
  sunrise: Date,
  sunset: Date,
  timezone: number
): string;
export function getIconSrc(
  weatherIcon: string,
  sunrise?: Date,
  sunset?: Date,
  timezone?: number
): string {
  if (!sunrise || !sunset || timezone === undefined) {
    return `icons/${weatherIcon}.png`;
  }

  const iconCode = /(\d+)/.exec(weatherIcon)?.[0];

  if (!iconCode) {
    throw new Error('wrong icon format');
  }

  const now = getTimezoneTime(new Date(), timezone);
  if (now.getTime() < sunrise.getTime()) {
    return `icons/${iconCode}n.png`;
  } else if (now.getTime() < sunset.getTime()) {
    return `icons/${iconCode}d.png`;
  } else {
    return `icons/${iconCode}n.png`;
  }
}
