import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from './cache/cache.module';
import { CitiesModule } from './cities/cities.module';
import { Config, configuration } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => ({
        uri: configService.get('mongoUrl'),
        dbName: configService.get('mongoDBName'),
      }),
      inject: [ConfigService],
    }),
    CacheModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
