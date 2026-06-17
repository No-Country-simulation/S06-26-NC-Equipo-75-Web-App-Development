import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';

export function ApiLogin() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),

    ApiOperation({
      summary: 'Iniciar sesión',
      description:
        'Autentica un usuario mediante email y contraseña y devuelve un JWT.',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Login exitoso.',
      type: LoginDto,
    }),

    ApiUnauthorizedResponse({
      description: 'Credenciales inválidas.',
    }),

    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos.',
    }),
  );
}
