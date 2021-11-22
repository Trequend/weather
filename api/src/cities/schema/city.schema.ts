import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  country: string;

  @Prop({ required: true, type: { lon: Number, lat: Number } })
  coord: { lon: number; lat: number };
}

export const CitySchema = SchemaFactory.createForClass(City);
