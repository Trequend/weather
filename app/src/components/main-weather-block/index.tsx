import { FC } from 'react';
import classes from './index.module.css';
import { ReactComponent as VectorIcon } from '../../assets/vector.svg';

export const MainWeatherBlock: FC = () => {
  return (
    <div className={classes.root}>
      <img className={classes.icon} src="icons/01d.png" alt="Weather icon" />
      <h2 className={classes.city}>
        Moscow
        <a href="geo:55.751244,37.618423" className={classes.vector}>
          <VectorIcon />
        </a>
      </h2>
      <p className={classes.temperature}>31</p>
    </div>
  );
};
