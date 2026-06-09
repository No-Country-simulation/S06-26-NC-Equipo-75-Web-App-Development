import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  constructor(id: string, name: string, email: string, role: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único del usuario (UUID)' })
  id: string;

  @ApiProperty({ example: 'Facundo', description: 'Nombre del usuario' })
  name: string;

  @ApiProperty({ example: 'facu@example.com', description: 'Correo electrónico institucional o personal' })
  email: string;

  @ApiProperty({ example: 'developer', description: 'Rol asignado en la plataforma' })
  role: string;
}
