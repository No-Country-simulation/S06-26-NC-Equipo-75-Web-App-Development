import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { VacancyStatus } from '@prisma/client';

export function ApiCreateVacancy() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Crear una nueva vacante',
    }),
    ApiResponse({
      status: 201,
      description: 'Vacante creada correctamente',
    }),
  );
}

export function ApiFindAllVacancies() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar vacantes',
    }),
    ApiQuery({
      name: 'status',
      enum: VacancyStatus,
      required: false,
    }),
    ApiQuery({
      name: 'companyId',
      required: false,
    }),
    ApiQuery({
      name: 'regionId',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Listado de vacantes',
    }),
  );
}

export function ApiFindVacancyById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener vacante por ID',
    }),
    ApiParam({
      name: 'id',
      description: 'ID de la vacante',
    }),
    ApiResponse({
      status: 200,
      description: 'Vacante encontrada',
    }),
    ApiResponse({
      status: 404,
      description: 'Vacante no encontrada',
    }),
  );
}

export function ApiFindVacancyByCompany() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener vacantes por empresa',
    }),
    ApiParam({
      name: 'companyId',
      description: 'ID de la empresa',
    }),
    ApiResponse({
      status: 200,
      description: 'Listado de vacantes',
    }),
  );
}

export function ApiUpdateVacancy() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar una vacante',
    }),
    ApiParam({
      name: 'id',
      description: 'ID de la vacante',
    }),
    ApiResponse({
      status: 200,
      description: 'Vacante actualizada correctamente',
    }),
  );
}

export function ApiUpdateStatusVacancy() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar estado de la vacante',
    }),
    ApiParam({
      name: 'id',
      description: 'ID de la vacante',
    }),
    ApiResponse({
      status: 200,
      description: 'Estado actualizado correctamente',
    }),
  );
}
