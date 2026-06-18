import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { VacanteCreateDto } from './dto/vacante-create.dto';
import { VacanteUpdateDto } from './dto/vacante-update.dto';
import { VacanteUpdateStatusDto } from './dto/vacante-update-status.dto';
import { VacanteFiltersDto } from './dto/vacante-filters.dto';
import { VacantesService } from './vacantes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  @ApiCreateVacancy()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() vacanteCreateDto: VacanteCreateDto,
  ) {
    return this.vacantesService.create(req.user.sub, vacanteCreateDto);
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
  @UseGuards(JwtAuthGuard)
  @ApiUpdateVacancy()
  update(
    @Param('id') id: string,
    @Body() vacanteUpdateDto: VacanteUpdateDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.vacantesService.update(id, vacanteUpdateDto, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  //@ApiDeleteVacancy()
  delete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.vacantesService.delete(id, req.user.sub);
  }
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateStatusVacancy()
  updateStatus(
    @Param('id') id_vacante: string,
    @Body() dto: VacanteUpdateStatusDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.vacantesService.updateStatus(id_vacante, dto, req.user.sub);
  }
}
