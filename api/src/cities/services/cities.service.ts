import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import fs from 'fs/promises';
import { Model } from 'mongoose';
import { concatAll, from, map } from 'rxjs';
import { Config } from 'src/config/configuration';
import util from 'util';
import zlib from 'zlib';
import { City } from '../schema/city.schema';

const unzip = util.promisify(zlib.unzip);

export type SearchOptions = {
  offset: number;
  limit: number;
};

@Injectable()
export class CitiesService implements OnModuleInit {
  private readonly logger = new Logger(CitiesService.name);

  public constructor(
    @InjectModel(City.name) private readonly model: Model<City>,
    private httpService: HttpService,
    private readonly config: ConfigService<Config>
  ) {}

  onModuleInit() {
    this.initDatabase();
  }

  public async initDatabase() {
    if (await this.databaseInitialized()) {
      return;
    }

    const file = await fs.readFile('src/cities/assets/city.list.json.gz');
    const json = (await unzip(file)).toString();
    const cities: Array<City> = JSON.parse(json);
    this.logger.log('Inserting cities...');
    await this.model.insertMany(cities);
    this.logger.log('Cities inserted');
  }

  public async search(query: string, { offset, limit }: SearchOptions) {
    await this.throwIfNotInitialized();

    if (query === '') {
      return {
        total: 0,
        cities: [],
      };
    }

    const total = await this.model
      .count({ name: { $regex: new RegExp(query, 'i') } })
      .exec();

    const cities = await this.model
      .find({ name: { $regex: new RegExp(query, 'i') } })
      .skip(offset)
      .limit(limit)
      .exec();

    return new Promise((resolve, reject) => {
      const list = [];

      return from(cities)
        .pipe(
          map((city) => {
            return this.getCity(city.id);
          }),
          concatAll(),
          concatAll()
        )
        .subscribe({
          next: (city) => {
            list.push(city);
          },
          complete: () => {
            resolve({
              total,
              cities: list,
            });
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }

  public async getCity(openWeatherId: string) {
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

  private async throwIfNotInitialized() {
    if (await this.databaseInitialized()) {
      return;
    }

    throw new InternalServerErrorException('Database is not initialized');
  }

  private async databaseInitialized() {
    return (await this.model.count().exec()) !== 0;
  }
}
