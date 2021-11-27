import { FC } from 'react';
import {
  Button,
  CityCard,
  ErrorMessage,
  Loading,
} from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { CITIES_SEARCH_LIMIT } from '../../constants';
import { searchActions } from '../../slice';
import classes from './index.module.css';

export const SearchResult: FC = () => {
  const { cities, total, loading, error } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();

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
        <Button
          className={classes.button}
          onClick={() => {
            dispatch(
              searchActions.fetchCities({
                offset: cities.length,
                limit: CITIES_SEARCH_LIMIT,
              })
            );
          }}
        >
          More
        </Button>
      ) : total === 0 ? (
        <p className={classes.empty}>No cities</p>
      ) : null}
    </div>
  );
};
