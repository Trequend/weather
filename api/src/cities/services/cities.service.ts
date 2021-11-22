import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import fs from 'fs/promises';
import { Model } from 'mongoose';
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
    @InjectModel(City.name) private readonly model: Model<City>
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

    return {
      total,
      cities,
    };
  }

  public async getCity(openWeatherId: string) {
    this.throwIfNotInitialized();
    const city = await this.model.findOne({ id: openWeatherId }).exec();
    return city?.toObject();
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
