import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntryDocument = Entry & Document;

@Schema()
export class Entry {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  value: string;

  @Prop({ expires: 0 })
  expires: Date;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
