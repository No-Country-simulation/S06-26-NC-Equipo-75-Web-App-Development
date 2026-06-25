import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiFindAllCandidates,
  ApiFindCandidateDetail,
} from './candidatos.swagger';
import { CandidatoFiltersDto } from './dto/candidato-filters.dto';

@Controller('candidatos')
export class CandidatosController {
  constructor(private readonly candidatosService: CandidatosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiFindAllCandidates()
  findAll(@Query() filters: CandidatoFiltersDto) {
    return this.candidatosService.findAll(filters);
  }

  @Get(':id/detalle')
  @UseGuards(JwtAuthGuard)
  @ApiFindCandidateDetail()
  findDetail(@Param('id') id: string) {
    return this.candidatosService.findDetail(id);
  }
}
