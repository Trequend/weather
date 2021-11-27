import { useNavigate, useLocation } from 'react-router-dom';
import { CityWeather } from '../../components';
import { ErrorMessage } from '../../components/error-message';
import { AppPage } from '../../types';
import { CITY_PATHNAME } from './constants';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as DoneIcon } from '../../assets/done.svg';
import classes from './index.module.css';
import { HOME_PATHNAME } from '../home-page/constants';
import { useCitiesIdsList } from '../../hooks';

export const CityPage: AppPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = Number.parseInt(params.get('id') || '', 10);
  const { ids, addId, removeId } = useCitiesIdsList();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <nav>
          <button
            onClick={() => {
              navigate(HOME_PATHNAME);
            }}
          >
            <BackIcon />
          </button>
        </nav>
        {ids.indexOf(id) === -1 ? (
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
        )}
      </header>
      <main className={classes.main}>
        {Number.isNaN(id) ? (
          <ErrorMessage error={new Error('No city id')} />
        ) : (
          <CityWeather id={id} />
        )}
      </main>
    </div>
  );
};

CityPage.pathname = CITY_PATHNAME;
