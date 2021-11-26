import { FC, useState } from 'react';
import classes from './index.module.css';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

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
      <button className={classes.button} type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};
