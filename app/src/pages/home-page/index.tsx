import { CitiesSlider } from '../../components';
import { Search, SearchResult } from '../../features/search/components';
import { useAppSelector } from '../../hooks';
import { AppPage } from '../../types';
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
          Logo icon made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </footer>
      )}
    </div>
  );
};

HomePage.pathname = HOME_PATHNAME;
