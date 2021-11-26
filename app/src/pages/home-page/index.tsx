import { CitiesSlider, Search } from '../../components';
import { AppPage } from '../../types';
import { HOME_PATHNAME } from './constants';
import classes from './index.module.css';

export const HomePage: AppPage = () => {
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Search />
      </header>
      <main>
        <CitiesSlider />
      </main>
    </div>
  );
};

HomePage.pathname = HOME_PATHNAME;
