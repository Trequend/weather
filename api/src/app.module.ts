import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesModule } from './cities/cities.module';
import { Config, configuration } from './config/configuration';
import { WeatherModule } from './weather/weather.module';

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
    CitiesModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
