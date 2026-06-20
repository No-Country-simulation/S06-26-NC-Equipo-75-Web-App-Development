import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiCreateCompanyProfile() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Crear perfil de empresa',
    }),
    ApiResponse({
      status: 201,
      description: 'Empresa creada correctamente',
    }),
  );
}

export function ApiFindAllCompanies() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar empresas',
    }),
    ApiResponse({
      status: 200,
      description: 'Listado de empresas',
    }),
  );
}

export function ApiFindCompanyById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener empresa por ID',
    }),
    ApiParam({
      name: 'id',
      description: 'ID de la empresa',
    }),
    ApiResponse({
      status: 200,
      description: 'Empresa encontrada',
    }),
    ApiResponse({
      status: 404,
      description: 'Empresa no encontrada',
    }),
  );
}

export function ApiUpdateCompanyProfile() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Actualizar perfil de empresa',
    }),
    ApiParam({
      name: 'id',
      description: 'ID de la empresa',
    }),
    ApiResponse({
      status: 200,
      description: 'Empresa actualizada correctamente',
    }),
  );
}