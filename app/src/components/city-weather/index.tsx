import { FC } from 'react';
import { MainWeatherBlock, GeneralWeatherBlock } from '../weather-blocks';
import classes from './index.module.css';

export const CityWeather: FC = () => {
  return (
    <div>
      <MainWeatherBlock className={classes.main} />
      <GeneralWeatherBlock />
    </div>
  );
};
