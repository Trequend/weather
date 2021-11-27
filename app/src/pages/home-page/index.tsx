import { useState } from 'react';
import { CitiesSlider, Search, SearchResult } from '../../components';
import { AppPage } from '../../types';
import { HOME_PATHNAME } from './constants';
import classes from './index.module.css';

export const HomePage: AppPage = () => {
  const [query, setQuery] = useState('');

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Search onSearch={setQuery} />
      </header>
      <main>{query ? <SearchResult query={query} /> : <CitiesSlider />}</main>
    </div>
  );
};

HomePage.pathname = HOME_PATHNAME;
