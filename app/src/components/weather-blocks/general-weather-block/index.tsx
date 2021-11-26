import { FC } from 'react';
import { LabeledBlock } from '../../labeled-block';
import classes from './index.module.css';

export type GeneralWeatherBlockProps = {
  className?: string;
};

export const GeneralWeatherBlock: FC<GeneralWeatherBlockProps> = ({
  className,
}) => {
  const rootClassName = className
    ? `${className} ${classes.root}`
    : classes.root;

  return (
    <div className={rootClassName}>
      <LabeledBlock label="Time" content="11:25 AM" />
      <LabeledBlock label="UV" content="4" />
      <LabeledBlock label="% RAIN" content="58%" />
      <LabeledBlock label="AQ" content="22" />
    </div>
  );
};
