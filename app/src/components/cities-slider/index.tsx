import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import classes from './index.module.css';
import { CityWeather } from '../city-weather';

SwiperCore.use([Pagination]);

export const CitiesSlider: FC = () => {
  return (
    <Swiper pagination spaceBetween={30} className={classes.swiper}>
      <SwiperSlide>
        <CityWeather id={524901} />
      </SwiperSlide>
      <SwiperSlide>
        <CityWeather id={551487} />
      </SwiperSlide>
      <SwiperSlide>
        <CityWeather id={2022890} />
      </SwiperSlide>
    </Swiper>
  );
};
