import { FC } from 'react';
import { getTimezoneTime } from '../../../functions';
import { useInterval } from '../../../hooks';
import { DayWidget } from './day-widget';
import { formatDeltaTime } from './formatDeltaTime';
import classes from './index.module.css';

export type DayWeatherBlockProps = {
  className?: string;
  sunrise: Date;
  sunset: Date;
  timezone: number;
  weatherIcon: string;
};

export const DayWeatherBlock: FC<DayWeatherBlockProps> = ({
  className,
  sunrise,
  sunset,
  timezone,
  weatherIcon,
}) => {
  const rootClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  return (
    <div className={rootClassName}>
      <h3 className={classes.title}>Sunrise &#38; Sunset</h3>
      <DayWidget
        sunrise={sunrise}
        sunset={sunset}
        timezone={timezone}
        weatherIcon={weatherIcon}
        className={classes.widget}
      />
      <p className={classes.info}>
        <span>Length of day:</span> {formatDeltaTime(sunrise, sunset)}
      </p>
      <RemainingDaylight
        sunrise={sunrise}
        sunset={sunset}
        timezone={timezone}
      />
    </div>
  );
};

type RemainingDaylightProps = {
  sunrise: Date;
  sunset: Date;
  timezone: number;
};

const RemainingDaylight: FC<RemainingDaylightProps> = ({
  sunrise,
  sunset,
  timezone,
}) => {
  const now = useInterval(1000);
  const time = getTimezoneTime(now, timezone);

  if (
    time.getTime() < sunset.getTime() &&
    time.getTime() >= sunrise.getTime()
  ) {
    return (
      <p className={classes.info}>
        <span>Remaining daylight:</span> {formatDeltaTime(time, sunset)}
      </p>
    );
  } else {
    return null;
  }
};
