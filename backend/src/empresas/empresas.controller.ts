import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
  Delete,
} from '@nestjs/common';

import { EmpresasService } from './empresas.service';
import { EmpresaCreateDto } from './dto/empresa-create.dto';
import { EmpresaUpdateDto } from './dto/empresa-update.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/jwt-auth.guard';

import {
  ApiCreateCompanyProfile,
  ApiFindAllCompanies,
  ApiFindCompanyById,
  ApiUpdateCompanyProfile,
  ApiVacancyMetrics,
  ApiSelectionFunnel,
} from './empresas.swagger';
import { EmpresaGrupoDiversidadDto } from './dto/empresa-grupo-diversidad.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiCreateCompanyProfile()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: EmpresaCreateDto,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only admins can create companies',
      );
    }
    return this.empresasService.create(req.user.sub, dto);
  }

  @Get()
  @ApiFindAllCompanies()
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':id')
  @ApiFindCompanyById()
  findById(@Param('id') id: string) {
    return this.empresasService.findById(id);
  }

  @Get(':id/dashboard')
  @UseGuards(JwtAuthGuard)
  findDashboard(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user.companyId) {
      throw new ForbiddenException('User does not belong to any company');
    }
    return this.empresasService.findDashboard(id, req.user.sub);
  }

  @Get(':id/dashboard/vacancies')
  @ApiVacancyMetrics()
  @UseGuards(JwtAuthGuard)
  findVacancyMetrics(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!req.user.companyId) {
      throw new ForbiddenException(
        'User does not belong to any company',
      );
    }

    return this.empresasService.findVacancyMetrics(
      id,
      req.user.sub,
    );
  }

  @Get(':id/weeklyMatches')
  @UseGuards(JwtAuthGuard)
  getWeeklyMatches(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user.companyId) {
      throw new ForbiddenException('User does not belong to any company');
    }

    return this.empresasService.getWeeklyMatches(id, req.user.sub);
  }

  @Get(':id/dashboard/esg')
  @UseGuards(JwtAuthGuard)
  findEsgDashboard(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user.companyId) {
      throw new ForbiddenException('User does not belong to any company');
    }

    return this.empresasService.findEsgDashboard(id, req.user.sub);
  }

  @Get(':id/dashboard/badges')
  @UseGuards(JwtAuthGuard)
  findBadgeDistribution(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!req.user.companyId) {
      throw new ForbiddenException('User does not belong to any company');
    }
    return this.empresasService.findBadgeDistribution(id, req.user.sub);
  }

  @Patch(':id/perfil')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateCompanyProfile()
  update(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: EmpresaUpdateDto,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only admins can update companies',
      );
    }
    return this.empresasService.update(id, dto, req.user.sub);
  }


  @Patch(':id/grupoDiversidad')
  @UseGuards(JwtAuthGuard)
  async addGrupoDiversidad(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: EmpresaGrupoDiversidadDto,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only admins can modify company groups',
      );
    }
    return this.empresasService.addGrupoDiversidad(id, dto.grupoId, req.user.sub);
  }

  @Delete(':id/grupoDiversidad/:grupoId')
  @UseGuards(JwtAuthGuard)
  async removeGrupoDiversidad(
    @Param('id') id: string,
    @Param('grupoId') grupoId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only admins can modify company groups',
      );
    }
    return this.empresasService.removeGrupoDiversidad(id, grupoId, req.user.sub);
  }


  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteCompany(@Req() req: AuthenticatedRequest) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete companies');
    }
    return this.empresasService.delete(req.user.sub);
  }

  @Get(':id/dashboard/funnel')
  @ApiSelectionFunnel()
  @UseGuards(JwtAuthGuard)
  findSelectionFunnel(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!req.user.companyId) {
      throw new ForbiddenException(
        'User does not belong to any company',
      );
    }

    return this.empresasService.findSelectionFunnel(
      id,
      req.user.sub,
    );
  }

}
