import { FC } from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CityWeather } from '..';
import { useCitiesIdsList } from '../../hooks';
import classes from './index.module.css';

SwiperCore.use([Pagination]);

export const CitiesSlider: FC = () => {
  const { ids, removeId } = useCitiesIdsList();

  return ids.length === 0 ? (
    <div className={classes.empty}>
      <h2>No cities selected</h2>
      <p>Use search to select cities</p>
    </div>
  ) : (
    <Swiper pagination spaceBetween={30} className={classes.swiper}>
      {ids.map((id) => (
        <SwiperSlide key={id}>
          <CityWeather
            id={id}
            onRemove={() => {
              removeId(id);
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
