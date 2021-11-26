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
        <CityWeather />
      </SwiperSlide>
      <SwiperSlide>
        <CityWeather />
      </SwiperSlide>
      <SwiperSlide>
        <CityWeather />
      </SwiperSlide>
    </Swiper>
  );
};
