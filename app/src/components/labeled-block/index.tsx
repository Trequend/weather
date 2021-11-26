import { FC } from 'react';
import classes from './index.module.css';

export type LabeledBlockProps = {
  label: string;
  content: string;
};

export const LabeledBlock: FC<LabeledBlockProps> = ({ label, content }) => {
  return (
    <div className={classes.root}>
      <h4 className={classes.label}>{label}</h4>
      <p className={classes.content}>{content}</p>
    </div>
  );
};
