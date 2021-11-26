import { FC } from 'react';
import classes from './index.module.css';
import { ReactComponent as VectorIcon } from '../../../assets/vector.svg';
import { WeatherIcon } from '../../weather-icon';

export type MainWeatherBlockProps = {
  className?: string;
  name: string;
  lat: number;
  lon: number;
  temperature: number;
  weatherIcon: string;
  weatherDescription: string;
  sunrise: Date;
  sunset: Date;
};

export const MainWeatherBlock: FC<MainWeatherBlockProps> = ({
  className,
  name,
  lat,
  lon,
  temperature,
  weatherIcon,
  weatherDescription,
  sunrise,
  sunset,
}) => {
  const rootClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  return (
    <div className={rootClassName}>
      <WeatherIcon
        className={classes.icon}
        icon={weatherIcon}
        description={weatherDescription}
        sunrise={sunrise}
        sunset={sunset}
      />
      <h2 className={classes.city}>
        {name}
        <a href={`geo:${lat},${lon}`} className={classes.vector}>
          <VectorIcon />
        </a>
      </h2>
      <p className={classes.temperature}>{temperature}</p>
    </div>
  );
};
