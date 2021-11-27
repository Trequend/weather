import { FC, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import classes from './index.module.css';

export type SearchProps = {
  onSearch?: (query: string) => void;
};

export const Search: FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <form
      className={classes.root}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch && onSearch(query);
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
          onSearch && onSearch('');
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
