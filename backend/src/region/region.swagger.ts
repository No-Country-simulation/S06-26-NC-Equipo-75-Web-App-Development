import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

export function ApiCreateRegion() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear región',
      description: 'Crea una nueva región.',
    }),

    ApiCreatedResponse({
      description: 'Región creada correctamente.',
    }),

    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos.',
    }),

    ApiConflictResponse({
      description: 'La región ya existe.',
    }),
  );
}
