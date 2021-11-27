import { FC, useEffect, useState } from 'react';
import classes from './index.module.css';
import { ReactComponent as Icon } from '../../assets/loading.svg';

export type LoadingProps = {
  timeout?: number;
};

export const Loading: FC<LoadingProps> = ({ timeout }) => {
  const [visible, setVisible] = useState(() => !timeout);

  useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(() => setVisible(true), timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timeout]);

  const rootClassName = timeout
    ? `${classes.root} ${classes.appear}`
    : classes.root;

  if (visible) {
    return (
      <div className={rootClassName}>
        <Icon className={classes.icon} />
        Loading
      </div>
    );
  } else {
    return null;
  }
};
