export function getIconSrc(weatherIcon: string): string;
export function getIconSrc(
  weatherIcon: string,
  sunrise: Date,
  sunset: Date
): string;
export function getIconSrc(
  weatherIcon: string,
  sunrise?: Date,
  sunset?: Date
): string {
  if (!sunrise || !sunset) {
    return `icons/${weatherIcon}.png`;
  }

  const iconCode = /(\d+)/.exec(weatherIcon)?.[0];

  if (!iconCode) {
    throw new Error('wrong icon format');
  }

  const now = new Date();
  if (now.getTime() < sunrise.getTime()) {
    return `icons/${iconCode}n.png`;
  } else if (now.getTime() < sunset.getTime()) {
    return `icons/${iconCode}d.png`;
  } else {
    return `icons/${iconCode}n.png`;
  }
}
