import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CandidateLevel } from '@prisma/client';

export function ApiFindAllCandidates() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener candidatos',
      description: 'Devuelve la lista de candidatos disponibles.',
    }),
    ApiQuery({
      name: 'nivel',
      required: false,
      enum: CandidateLevel,
    }),
    ApiQuery({
      name: 'nombre',
      required: false,
      type: String,
    }),
    ApiQuery({
      name: 'region',
      required: false,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de candidatos obtenida correctamente.',
    }),
  );
}

export function ApiFindCandidateDetail() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener detalle de un candidato',
      description:
        'Devuelve score, skills, experiencia, badges y demás información del candidato.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del candidato',
    }),
    ApiResponse({
      status: 200,
      description: 'Detalle del candidato obtenido correctamente.',
    }),
    ApiResponse({
      status: 404,
      description: 'Candidato no encontrado.',
    }),
  );
}