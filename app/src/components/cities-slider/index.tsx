import { FC } from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, CityWeather } from '..';
import { useCitiesIdsList } from '../../hooks';
import classes from './index.module.css';

SwiperCore.use([Pagination]);

export const CitiesSlider: FC = () => {
  const { ids, removeId } = useCitiesIdsList();

  return (
    <Swiper pagination spaceBetween={30} className={classes.swiper}>
      {ids.map((id) => (
        <SwiperSlide key={id}>
          <CityWeather id={id} />
          <Button
            className={classes.button}
            onClick={() => {
              removeId(id);
            }}
          >
            Remove
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
