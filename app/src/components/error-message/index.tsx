import { FC } from 'react';
import classes from './index.module.css';

export type ErrorMessageProps = {
  error?: unknown;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  if (error) {
    let message = error instanceof Error ? error.message : 'Unknown error';
    return <p className={classes.root}>{message}</p>;
  } else {
    return null;
  }
};
