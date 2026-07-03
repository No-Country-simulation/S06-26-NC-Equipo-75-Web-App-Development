import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiFindAllSkills() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar skills',
    }),
    ApiResponse({
      status: 200,
      description: 'Listado de skills',
    }),
  );
}

export function ApiFindSkillById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener skill por ID',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del skill',
    }),
    ApiResponse({
      status: 200,
      description: 'Skill encontrado',
    }),
    ApiResponse({
      status: 404,
      description: 'Skill no encontrado',
    }),
  );
}
export function ApiCreateSkill() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Crear skill',
    }),
    ApiResponse({
      status: 201,
      description: 'Skill creado correctamente',
    }),
    ApiResponse({
      status: 400,
      description: 'El skill ya existe',
    }),
    ApiResponse({
      status: 403,
      description: 'Only recruiters can create skills',
    }),
  );
}