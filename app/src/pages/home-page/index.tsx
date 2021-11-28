import { Link } from 'react-router-dom';
import { CitiesSlider } from '../../components';
import { Search, SearchResult } from '../../features/search/components';
import { useAppSelector } from '../../hooks';
import { AppPage } from '../../types';
import { ABOUT_PATHNAME } from '../about-page/constants';
import { HOME_PATHNAME } from './constants';
import classes from './index.module.css';

export const HomePage: AppPage = () => {
  const query = useAppSelector((state) => state.search.query);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Search />
      </header>
      <main className={classes.main}>
        {query ? <SearchResult /> : <CitiesSlider />}
      </main>
      {query ? null : (
        <footer className={classes.footer}>
          <Link to={ABOUT_PATHNAME}>About Weather</Link>
        </footer>
      )}
    </div>
  );
};

HomePage.pathname = HOME_PATHNAME;
