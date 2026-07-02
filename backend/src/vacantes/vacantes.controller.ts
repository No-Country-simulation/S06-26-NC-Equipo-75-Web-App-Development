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
  ApiGetShortlist,
} from './vacantes.swagger';

@Controller('vacantes')
export class VacantesController {
  constructor(private readonly vacantesService: VacantesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreateVacancy()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() vacanteCreateDto: VacanteCreateDto,
  ) {
    const vacante = await this.vacantesService.create(
      req.user.sub,
      vacanteCreateDto,
    );
    const match = await this.vacantesService.runMatch(vacante.id, req.user.sub);
    return { vacante, match };
  }

  @Post(':id/match')
  @UseGuards(JwtAuthGuard)
  async runMatch(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return await this.vacantesService.runMatch(id, req.user.sub);
  }

  @Get(':id/match')
  @UseGuards(JwtAuthGuard)
  async getMatchCandidatos(
    @Param('id') vacanteId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.vacantesService.getCandidatosByVancante(
      vacanteId,
      req.user.sub,
    );
  }

  @Get('shortlist/:vacanteId')
  @ApiGetShortlist()
  @UseGuards(JwtAuthGuard)
  async getShortlist(
    @Param('vacanteId') vacanteId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.vacantesService.getShortlist(vacanteId, req.user.sub);
  }

  @Get()
  @ApiFindAllVacancies()
  async findAll(@Query() filters: VacanteFiltersDto) {
    return await this.vacantesService.findAll(filters);
  }

  @Get(':id')
  @ApiFindVacancyById()
  async findById(@Param('id') id: string) {
    return await this.vacantesService.findById(id);
  }

  @Get('company/:companyId')
  @ApiFindVacancyByCompany()
  async findByCompany(@Param('companyId') companyId: string) {
    return await this.vacantesService.findByCompany(companyId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateVacancy()
  async update(
    @Param('id') id: string,
    @Body() vacanteUpdateDto: VacanteUpdateDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.vacantesService.update(
      id,
      vacanteUpdateDto,
      req.user.sub,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  //@ApiDeleteVacancy()
  async delete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return await this.vacantesService.delete(id, req.user.sub);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateStatusVacancy()
  async updateStatus(
    @Param('id') id_vacante: string,
    @Body() dto: VacanteUpdateStatusDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return await this.vacantesService.updateStatus(
      id_vacante,
      dto,
      req.user.sub,
    );
  }
}
