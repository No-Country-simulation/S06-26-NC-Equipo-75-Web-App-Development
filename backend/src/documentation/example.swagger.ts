import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from '../module-example/dto/explame.dto';

export function ApiGetProfileEjemplo() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({
      summary: 'Obtener perfil de ejemplo',
      description: 'Devuelve la estructura base de un usuario para que el frontend pueda visualizar los campos.',
    }),
    ApiResponse({
      status: 200,
      description: 'Estructura de respuesta exitosa.',
      type: UserResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'No autorizado. Token inválido o expirado.',
    }),
  );
}
