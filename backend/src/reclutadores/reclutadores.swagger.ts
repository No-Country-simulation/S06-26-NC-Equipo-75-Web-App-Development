import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiCreateRecruiter() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Crear reclutador',
      description:
        'Crea un nuevo reclutador y lo asocia automáticamente a la empresa del administrador autenticado.',
    }),
    ApiResponse({
      status: 201,
      description: 'Reclutador creado correctamente.',
    }),
    ApiResponse({
      status: 400,
      description:
        'El usuario ya existe o el administrador no pertenece a ninguna empresa.',
    }),
    ApiResponse({
      status: 401,
      description: 'Token inválido o ausente.',
    }),
    ApiResponse({
      status: 403,
      description: 'Solo los administradores pueden crear reclutadores.',
    }),
  );
}

export function ApiFindAllRecruiters() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Listar reclutadores',
      description:
        'Obtiene todos los reclutadores pertenecientes a la empresa del administrador autenticado.',
    }),
    ApiResponse({
      status: 200,
      description: 'Listado de reclutadores.',
    }),
    ApiResponse({
      status: 401,
      description: 'Token inválido o ausente.',
    }),
    ApiResponse({
      status: 403,
      description: 'Solo los administradores pueden consultar reclutadores.',
    }),
  );
}

export function ApiFindRecruiterById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Obtener reclutador por ID',
      description:
        'Obtiene un reclutador perteneciente a la empresa del administrador autenticado.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID del reclutador',
    }),
    ApiResponse({
      status: 200,
      description: 'Reclutador encontrado.',
    }),
    ApiResponse({
      status: 401,
      description: 'Token inválido o ausente.',
    }),
    ApiResponse({
      status: 403,
      description: 'Solo los administradores pueden consultar reclutadores.',
    }),
    ApiResponse({
      status: 404,
      description: 'Reclutador no encontrado.',
    }),
  );
}