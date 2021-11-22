import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';

@Controller('weather')
export class WeatherController {
  public constructor(private readonly weather: WeatherService) {}

  @Get(':id')
  public async getWeather(@Param('id') id: string) {
    return await this.weather.getWeather(id);
  }
}
