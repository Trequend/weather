import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from '../schemas/entry.schema';

@Injectable()
export class CacheService {
  public constructor(
    @InjectModel(Entry.name) private readonly model: Model<Entry>
  ) {}

  public async get(key: string) {
    const entry = await this.model.findOne({ key }).exec();
    return entry ? entry.toObject() : entry;
  }

  public async set(key: string, value: string, expires: Date) {
    await this.delete(key);

    const entry = new this.model({
      key,
      value,
      expires,
    });

    return await entry.save();
  }

  public async delete(key: string) {
    await this.model.deleteOne({ key }).exec();
  }

  public async deleteMany(regex: RegExp) {
    await this.model.deleteMany({ key: { $regex: regex } }).exec();
  }
}
