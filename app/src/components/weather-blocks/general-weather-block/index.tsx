import { format } from 'date-fns';
import { FC } from 'react';
import { getTimezoneTime } from '../../../functions';
import { useInterval } from '../../../hooks';
import { LabeledBlock } from '../../labeled-block';
import classes from './index.module.css';

export type GeneralWeatherBlockProps = {
  className?: string;
  timezone: number;
  temperatureFeels: number;
  temperatureMin: number;
  temperatureMax: number;
};

export const GeneralWeatherBlock: FC<GeneralWeatherBlockProps> = ({
  className,
  timezone,
  temperatureFeels,
  temperatureMin,
  temperatureMax,
}) => {
  const rootClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  return (
    <div className={rootClassName}>
      <Time timezone={timezone} />
      <LabeledBlock label="Feels" content={`${temperatureFeels} °`} />
      <LabeledBlock label="Min" content={`${temperatureMin} °`} />
      <LabeledBlock label="Max" content={`${temperatureMax} °`} />
    </div>
  );
};

type TimeProps = {
  timezone: number;
};

const Time: FC<TimeProps> = ({ timezone }) => {
  const now = useInterval(1000);
  const time = getTimezoneTime(now, timezone);
  return <LabeledBlock label="Time" content={format(time, 'hh:mm aa')} />;
};
