import { Layout } from '../../components';
import { AppPage } from '../../types';
import { ABOUT_PATHNAME } from './constants';
import classes from './index.module.css';

export const AboutPage: AppPage = () => {
  return (
    <Layout>
      <div className={classes.root}>
        <h1 className={classes.title}>Weather</h1>
        <p className={classes.version}>
          Version {process.env.REACT_APP_VERSION}
        </p>
        <p>Made by Dmitry Balakin</p>
        <p>
          Logo icon made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </p>
      </div>
    </Layout>
  );
};

AboutPage.pathname = ABOUT_PATHNAME;
