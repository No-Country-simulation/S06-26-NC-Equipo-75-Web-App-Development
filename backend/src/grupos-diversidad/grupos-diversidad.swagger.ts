import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiFindAllDiversityGroups() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar grupos de diversidad',
    }),
    ApiResponse({
      status: 200,
      description: 'Listado de grupos de diversidad',
    }),
  );
}

export function ApiFindDiversityGroupById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener grupo de diversidad por ID',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del grupo de diversidad',
    }),
    ApiResponse({
      status: 200,
      description: 'Grupo encontrado',
    }),
    ApiResponse({
      status: 404,
      description: 'Grupo no encontrado',
    }),
  );
}
export function ApiCreateDiversityGroup() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Crear grupo de diversidad',
    }),
    ApiResponse({
      status: 201,
      description: 'Grupo creado correctamente',
    }),
    ApiResponse({
      status: 400,
      description: 'El grupo ya existe',
    }),
    ApiResponse({
      status: 403,
      description: 'Only admins can create diversity groups',
    }),
  );
}