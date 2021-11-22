import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from './schemas/entry.schema';
import { CacheService } from './services/cache.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entry.name, schema: EntrySchema }]),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
