import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetProfileEjemplo } from '../documentation/example.swagger';
import { UserResponseDto } from './dto/explame.dto';

@ApiTags('Usuarios')
@Controller('users')
export class ModuleExampleController {
  @Get('profile-ejemplo')
  @ApiGetProfileEjemplo() // <-- ¡Toda la documentación concentrada acá!
  getProfileEjemplo(): UserResponseDto {
    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Facundo',
      email: 'facu@example.com',
      role: 'developer',
    };
  }
}
