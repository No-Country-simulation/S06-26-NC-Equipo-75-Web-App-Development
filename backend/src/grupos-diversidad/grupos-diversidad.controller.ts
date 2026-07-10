import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/jwt-auth.guard';

import { GruposDiversidadService } from './grupos-diversidad.service';
import { GrupoDiversidadCreateDto } from './dto/grupo-diversidad-create.dto';

import {
  ApiCreateDiversityGroup,
  ApiFindAllDiversityGroups,
  ApiFindDiversityGroupById,
} from './grupos-diversidad.swagger';

@Controller('grupos-diversidad')
export class GruposDiversidadController {
  constructor(
    private readonly gruposDiversidadService: GruposDiversidadService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreateDiversityGroup()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: GrupoDiversidadCreateDto,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Only admins can create diversity groups',
      );
    }

    return this.gruposDiversidadService.create(dto);
  }

  @Get()
  @ApiFindAllDiversityGroups()
  findAll() {
    return this.gruposDiversidadService.findAll();
  }

  @Get(':id')
  @ApiFindDiversityGroupById()
  findById(@Param('id') id: string) {
    return this.gruposDiversidadService.findById(id);
  }
}