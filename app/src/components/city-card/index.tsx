import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getIconSrc, kelvinToCelsius } from '../../functions';
import { City } from '../../types';
import classes from './index.module.css';

export type CityCardProps = {
  city: City;
};

export const CityCard: FC<CityCardProps> = ({ city }) => {
  return (
    <Link to={`/city?id=${city.id}`} className={classes.root}>
      <div className={classes.info}>
        <h2 className={classes.title}>
          {city.sys.country ? `${city.name}, ${city.sys.country}` : city.name}
        </h2>
        <span className={classes.temperature}>
          {kelvinToCelsius(city.main.temp)}
        </span>
        <p className={classes.coord}>
          {city.coord.lat}, {city.coord.lon}
        </p>
      </div>
      <img
        className={classes.icon}
        src={getIconSrc(city.weather[0].icon)}
        alt={city.weather[0].description}
      />
    </Link>
  );
};
