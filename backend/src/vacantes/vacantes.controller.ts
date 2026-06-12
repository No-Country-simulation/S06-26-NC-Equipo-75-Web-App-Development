import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { VacanteCreateDto } from './dto/vacante-create.dto';
import { VacanteUpdateDto } from './dto/vacante-update.dto';
import { VacanteUpdateStatusDto } from './dto/vacante-update-status.dto';
import { VacanteFiltersDto } from './dto/vacante-filters.dto';
import { VacantesService } from './vacantes.service';
import {
  ApiCreateVacancy,
  ApiFindAllVacancies,
  ApiFindVacancyById,
  ApiUpdateStatusVacancy,
  ApiUpdateVacancy,
  ApiFindVacancyByCompany,
} from './vacantes.swagger';

@Controller('vacantes')
export class VacantesController {
  constructor(private readonly vacantesService: VacantesService) {}

  @Post()
  @ApiCreateVacancy()
  create(@Body() vacanteCreateDto: VacanteCreateDto) {
    return this.vacantesService.create(vacanteCreateDto);
  }

  @Get()
  @ApiFindAllVacancies()
  findAll(@Query() filters: VacanteFiltersDto) {
    return this.vacantesService.findAll(filters);
  }

  @Get(':id')
  @ApiFindVacancyById()
  findById(@Param('id') id: string) {
    return this.vacantesService.findById(id);
  }

  @Get('company/:companyId')
  @ApiFindVacancyByCompany()
  findByCompany(@Param('companyId') companyId: string) {
    return this.vacantesService.findByCompany(companyId);
  }

  @Patch(':id')
  @ApiUpdateVacancy()
  update(@Param('id') id: string, @Body() vacanteUpdateDto: VacanteUpdateDto) {
    return this.vacantesService.update(id, vacanteUpdateDto);
  }

  @Patch(':id/status')
  @ApiUpdateStatusVacancy()
  updateStatus(@Param('id') id: string, @Body() dto: VacanteUpdateStatusDto) {
    return this.vacantesService.updateStatus(id, dto);
  }
}
