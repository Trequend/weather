import { FC } from 'react';
import classes from './index.module.css';
import { ReactComponent as VectorIcon } from '../../../assets/vector.svg';

export type MainWeatherBlockProps = {
  className?: string;
};

export const MainWeatherBlock: FC<MainWeatherBlockProps> = ({ className }) => {
  const rootClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  return (
    <div className={rootClassName}>
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
