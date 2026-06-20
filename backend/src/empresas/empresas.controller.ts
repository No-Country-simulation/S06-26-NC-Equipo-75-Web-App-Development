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
} from './empresas.swagger';

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
}