import { FC } from 'react';
import { getIconSrc } from '../../functions';
import { useInterval } from '../../hooks';

export type WeatherIconProps = {
  className?: string;
  icon: string;
  description: string;
  sunrise: Date;
  sunset: Date;
};

export const WeatherIcon: FC<WeatherIconProps> = ({
  className,
  icon,
  description,
  sunrise,
  sunset,
}) => {
  useInterval(1000);

  return (
    <img
      className={className}
      src={getIconSrc(icon, sunrise, sunset)}
      alt={description}
    />
  );
};
