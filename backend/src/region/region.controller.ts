import { Controller, Query } from '@nestjs/common';
import { RegionService } from './region.service';
import { Get } from '@nestjs/common';
import { RegionFiltersDto } from './dto/RegionFilters.dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  findAll(@Query() filters: RegionFiltersDto) {
    return this.regionService.findAll(filters);
  }
}
