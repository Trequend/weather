import { FC, useEffect, useState } from 'react';
import { Button } from '..';
import { kelvinToCelsius, unixTimestampToDate } from '../../functions';
import { City } from '../../types';
import { ErrorMessage } from '../error-message';
import { Loading } from '../loading';
import {
  DayWeatherBlock,
  GeneralWeatherBlock,
  MainWeatherBlock,
} from '../weather-blocks';
import classes from './index.module.css';

export type CityWeatherProps = {
  id: number;
  onRemove?: () => void;
};

export const CityWeather: FC<CityWeatherProps> = ({ id, onRemove }) => {
  const [city, setCity] = useState<City>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    let canceled = false;

    const action = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/cities/${id}`
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();
        setCity(json);
      } catch (error) {
        if (canceled) {
          return;
        }

        setError(error);
      }

      if (canceled) {
        return;
      }
    };

    action();
    const interval = setInterval(() => {
      action();
    }, 10 * 60 * 1000); // 10 Min

    return () => {
      canceled = true;
      clearInterval(interval);
    };
  }, [id]);

  if (error) {
    return <ErrorMessage error={error} />;
  } else if (city) {
    const weather = city.weather[0];
    const sunrise = unixTimestampToDate(city.sys.sunrise, city.timezone);
    const sunset = unixTimestampToDate(city.sys.sunset, city.timezone);

    return (
      <div>
        <MainWeatherBlock
          name={city.name}
          lat={city.coord.lat}
          lon={city.coord.lon}
          temperature={kelvinToCelsius(city.main.temp)}
          weatherIcon={weather.icon}
          weatherDescription={weather.description}
          sunrise={sunrise}
          sunset={sunset}
          timezone={city.timezone}
          className={classes.main}
        />
        <GeneralWeatherBlock
          timezone={city.timezone}
          temperatureFeels={kelvinToCelsius(city.main.feels_like)}
          temperatureMin={kelvinToCelsius(city.main.temp_min)}
          temperatureMax={kelvinToCelsius(city.main.temp_max)}
          className={classes.general}
        />
        <DayWeatherBlock
          sunrise={sunrise}
          sunset={sunset}
          timezone={city.timezone}
          weatherIcon={weather.icon}
        />
        {onRemove ? (
          <Button onClick={onRemove} className={classes.button}>
            Remove
          </Button>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className={classes.loading}>
        <Loading timeout={200} />
      </div>
    );
  }
};
