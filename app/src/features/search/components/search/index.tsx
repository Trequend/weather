import { FC, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../../assets/close.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/search.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { CITIES_SEARCH_LIMIT } from '../../constants';
import { searchActions } from '../../slice';
import classes from './index.module.css';

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { query: appQuery } = useAppSelector((state) => state.search);
  const [query, setQuery] = useState(appQuery);

  return (
    <form
      className={classes.root}
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(searchActions.setQuery(query));
        dispatch(
          searchActions.fetchCities({ offset: 0, limit: CITIES_SEARCH_LIMIT })
        );
      }}
    >
      <input
        type="search"
        className={classes.input}
        placeholder="Search Location"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <button
        type="button"
        style={{ opacity: query ? 1 : 0 }}
        className={classes.button}
        onClick={() => {
          setQuery('');
          dispatch(searchActions.clear());
        }}
      >
        <CloseIcon />
      </button>
      <button className={classes.button} type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};
