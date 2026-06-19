import { Controller, Query, Param, Post, Body } from '@nestjs/common';
import { RegionService } from './region.service';
import { Get } from '@nestjs/common';
import { RegionFiltersDto } from './dto/RegionFilters.dto';
import { CreateRegionDto } from './dto/RegionCreate.fto';
import { ApiCreateRegion } from './region.swagger';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  findAll(@Query() filters: RegionFiltersDto) {
    return this.regionService.findAll(filters);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.regionService.findById(id);
  }

  @ApiCreateRegion()
  @Post()
  create(@Body() dto: CreateRegionDto) {
    return this.regionService.create(dto);
  }
}
