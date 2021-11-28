import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import classes from './index.module.css';

export type LayoutProps = {
  extra?: ReactElement | null;
};

export const Layout: FC<LayoutProps> = ({ extra, children }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <nav>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon />
          </button>
        </nav>
        <>{extra}</>
      </header>
      <main className={classes.main}>{children}</main>
    </div>
  );
};
