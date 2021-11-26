import { FC } from 'react';
import { LabeledBlock } from '../../labeled-block';
import classes from './index.module.css';

export const GeneralWeatherBlock: FC = () => {
  return (
    <div className={classes.root}>
      <LabeledBlock label="Time" content="11:25 AM" />
      <LabeledBlock label="UV" content="4" />
      <LabeledBlock label="% RAIN" content="58%" />
      <LabeledBlock label="AQ" content="22" />
    </div>
  );
};
