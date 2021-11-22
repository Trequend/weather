import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';

@Module({
  imports: [HttpModule, CacheModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
