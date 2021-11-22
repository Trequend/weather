import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CITIES_LIMIT } from '../constants';
import { CitiesService } from '../services/cities.service';

@Controller('cities')
export class CitiesController {
  public constructor(private readonly service: CitiesService) {}

  @Get(':id')
  public async getCity(@Param('id') id: string) {
    const city = await this.service.getCity(id);
    if (city) {
      return city;
    } else {
      throw new NotFoundException('No city');
    }
  }

  @Get()
  public async getCities(
    @Query('query') query: string,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number
  ) {
    if (limit > CITIES_LIMIT) {
      limit = CITIES_LIMIT;
    }

    if (offset < 0) {
      offset = 0;
    }

    return await this.service.search(query, {
      offset,
      limit,
    });
  }
}
