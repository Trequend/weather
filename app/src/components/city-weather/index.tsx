import { FC, useEffect, useState } from 'react';
import { kelvinToCelsius, unixTimestampToDate } from '../../functions';
import { City } from '../../types/city.type';
import {
  MainWeatherBlock,
  GeneralWeatherBlock,
  DayWeatherBlock,
} from '../weather-blocks';
import classes from './index.module.css';

export type CityWeatherProps = {
  id: number;
};

export const CityWeather: FC<CityWeatherProps> = ({ id }) => {
  const [city, setCity] = useState<City>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let canceled = false;

    const action = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEATHER_API}/weather/${id}`
        );
        const json = await response.json();
        setCity(json);
      } catch (error) {
        if (canceled) {
          return;
        }

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
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
    return <p className={classes.error}>{error}</p>;
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
      </div>
    );
  } else {
    return <h2 className={classes.loading}>Loading...</h2>;
  }
};
