import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { VacancyStatus } from '@prisma/client';
import { ShortlistCandidateDto, ShortlistResponseDto } from './dto/vacanteShortlistCandidate.dto';


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

export function ApiGetShortlist() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener el shortlist de candidatos de una vacante',
    }),
    ApiResponse({
      status: 200,
      description: 'Shortlist recuperado correctamente',
      type: ShortlistResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Vacante no encontrada',
    }),
    ApiResponse({
      status: 403,
      description: 'No tiene permisos para acceder al shortlist',
    }),
  );
}

export function ApiAddSkillToVacancy() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Add skill to vacancy',
    }),
    ApiParam({
      name: 'id',
      description: 'Vacancy ID',
    }),
    ApiResponse({
      status: 201,
      description: 'Skill added to vacancy',
    }),
    ApiResponse({
      status: 404,
      description: 'Vacancy or Skill not found',
    }),
    ApiResponse({
      status: 400,
      description: 'Skill already assigned',
    }),
  );
}

export function ApiGetVacancySkills() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get vacancy skills',
    }),
    ApiParam({
      name: 'id',
      description: 'Vacancy ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Vacancy skills',
    }),
    ApiResponse({
      status: 404,
      description: 'Vacancy not found',
    }),
  );
}

export function ApiRemoveSkillFromVacancy() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Remove skill from vacancy',
    }),
    ApiParam({
      name: 'id',
      description: 'Vacancy ID',
    }),
    ApiParam({
      name: 'skillId',
      description: 'Skill ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Skill removed',
    }),
    ApiResponse({
      status: 404,
      description: 'Vacancy or Skill not found',
    }),
  );
}

export function ApiGetVacancyWeights() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get vacancy weights',
    }),
    ApiParam({
      name: 'id',
      description: 'Vacancy ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Vacancy weights',
    }),
    ApiResponse({
      status: 404,
      description: 'Vacancy not found',
    }),
  );
}

export function ApiUpdateVacancyWeights() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update vacancy weights',
    }),
    ApiParam({
      name: 'id',
      description: 'Vacancy ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Weights updated successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid weights',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden',
    }),
    ApiResponse({
      status: 404,
      description: 'Vacancy not found',
    }),
  );
}
