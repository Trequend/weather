import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';
import { Config } from 'src/config/configuration';

@Injectable()
export class WeatherService {
  public constructor(
    private httpService: HttpService,
    private readonly config: ConfigService<Config>
  ) {}

  public async getWeather(openWeatherId: string) {
    const openWeatherKey = this.config.get('openWeatherKey');
    if (!openWeatherKey) {
      throw new InternalServerErrorException('No key');
    }

    return this.httpService
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: { id: openWeatherId, appid: openWeatherKey },
      })
      .pipe(map((response) => response.data));
  }
}
