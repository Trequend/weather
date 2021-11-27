import { FC, useCallback, useEffect, useState } from 'react';
import { City } from '../../types';
import { CityCard } from '../city-card';
import { ErrorMessage } from '../error-message';
import { Loading } from '../loading';
import classes from './index.module.css';

export type SearchResultProps = {
  query: string;
};

const CITIES_LIMIT = 5;

export const SearchResult: FC<SearchResultProps> = ({ query }) => {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [cities, setCities] = useState<Array<City>>([]);

  const fetchCities = useCallback(
    async (offset: number, limit: number) => {
      setLoading(true);
      setCities((cities) => {
        const copy = [...cities];
        copy.splice(offset);
        return copy;
      });
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEATHER_API}/cities?query=${query}&offset=${offset}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error('Fetch error');
        }

        const json: { total: number; cities: Array<City> } =
          await response.json();
        setLoading(false);
        setTotal(json.total);
        setCities((cities) => cities.concat(json.cities));
      } catch (error) {
        setError(error);
      }
    },
    [query]
  );

  useEffect(() => {
    fetchCities(0, CITIES_LIMIT);
  }, [fetchCities]);

  return (
    <div className={classes.root}>
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <Loading />
      ) : cities.length < total ? (
        <button
          className={classes.button}
          onClick={() => {
            fetchCities(cities.length, CITIES_LIMIT);
          }}
        >
          More
        </button>
      ) : total === 0 ? (
        <p className={classes.empty}>No cities</p>
      ) : null}
    </div>
  );
};
