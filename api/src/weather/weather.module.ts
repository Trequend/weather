import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
