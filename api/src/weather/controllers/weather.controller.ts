import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from '../services/weather.service';

@Controller('weather')
@UseInterceptors(CacheInterceptor)
export class WeatherController {
  public constructor(private readonly weather: WeatherService) {}

  @Get(':id')
  public async getWeather(@Param('id') id: string) {
    return await this.weather.getWeather(id);
  }
}
