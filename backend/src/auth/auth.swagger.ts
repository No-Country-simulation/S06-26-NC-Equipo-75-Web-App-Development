import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
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

export function ApiSignUp() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),

    ApiOperation({
      summary: 'Registrar usuario',
      description:
        'Crea una nueva cuenta de usuario y devuelve un token JWT para autenticación inmediata.',
    }),

    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Usuario registrado correctamente.',
    }),

    ApiConflictResponse({
      description: 'Ya existe un usuario con el email proporcionado.',
    }),

    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos.',
    }),
  );
}

export function ApiMe() {
  return applyDecorators(
    ApiBearerAuth(),

    ApiOperation({
      summary: 'Obtener usuario autenticado',
      description:
        'Devuelve la información del usuario asociado al token JWT enviado.',
    }),

    ApiOkResponse({
      description: 'Información del usuario autenticado.',
    }),

    ApiUnauthorizedResponse({
      description: 'Token inválido o ausente.',
    }),
  );
}
