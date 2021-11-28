import { useLocation } from 'react-router-dom';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as DoneIcon } from '../../assets/done.svg';
import { CityWeather, Layout } from '../../components';
import { ErrorMessage } from '../../components/error-message';
import { useCitiesIdsList } from '../../hooks';
import { AppPage } from '../../types';
import { CITY_PATHNAME } from './constants';
import classes from './index.module.css';

export const CityPage: AppPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = Number.parseInt(params.get('id') || '', 10);
  const { ids, addId, removeId } = useCitiesIdsList();

  return (
    <Layout
      extra={
        ids.indexOf(id) === -1 ? (
          <button
            onClick={() => {
              addId(id);
            }}
            className={classes.add}
          >
            Add to list <AddIcon />
          </button>
        ) : (
          <button
            onClick={() => {
              removeId(id);
            }}
            className={classes.added}
          >
            Added to list <DoneIcon />
          </button>
        )
      }
    >
      {Number.isNaN(id) ? (
        <ErrorMessage error={new Error('No city id')} />
      ) : (
        <CityWeather id={id} />
      )}
    </Layout>
  );
};

CityPage.pathname = CITY_PATHNAME;
