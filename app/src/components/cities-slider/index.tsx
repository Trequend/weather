import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import classes from './index.module.css';
import { MainWeatherBlock } from '../main-weather-block';

SwiperCore.use([Pagination]);

export const CitiesSlider: FC = () => {
  return (
    <Swiper pagination className={classes.swiper}>
      <SwiperSlide>
        <MainWeatherBlock />
      </SwiperSlide>
      <SwiperSlide>
        <MainWeatherBlock />
      </SwiperSlide>
      <SwiperSlide>
        <MainWeatherBlock />
      </SwiperSlide>
    </Swiper>
  );
};
