import { startOfDay } from 'date-fns';
import { addHours, addMinutes } from 'date-fns/esm';
import { FC } from 'react';
import { useInterval } from '../../../hooks';
import { DayWidget } from './day-widget';
import { formatDeltaTime } from './formatDeltaTime';
import classes from './index.module.css';

export type DayWeatherBlockProps = {
  className?: string;
};

export const DayWeatherBlock: FC<DayWeatherBlockProps> = ({ className }) => {
  const rootClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  const base = startOfDay(new Date());
  const sunrise = addMinutes(addHours(base, 6), 34);
  const sunset = addMinutes(addHours(base, 20), 12);

  return (
    <div className={rootClassName}>
      <h3 className={classes.title}>Sunrise &#38; Sunset</h3>
      <DayWidget
        sunrise={sunrise}
        sunset={sunset}
        weatherIconSrc={'icons/01d.png'}
        className={classes.widget}
      />
      <p className={classes.info}>
        <span>Length of day:</span> {formatDeltaTime(sunrise, sunset)}
      </p>
      <RemainingDaylight date={sunset} />
    </div>
  );
};

type RemainingDaylightProps = {
  date: Date;
};

const RemainingDaylight: FC<RemainingDaylightProps> = ({ date }) => {
  const now = useInterval(1000);

  if (now.getTime() < date.getTime()) {
    return (
      <p className={classes.info}>
        <span>Remaining daylight:</span> {formatDeltaTime(now, date)}
      </p>
    );
  } else {
    return null;
  }
};
