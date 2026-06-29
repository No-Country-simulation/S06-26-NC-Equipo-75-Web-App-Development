import { IsEmail, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReclutadorCreateDto {
  @ApiProperty({
  example: 'Juan',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: 'Pérez',
  })
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({
    example: 'juan.perez@empresa.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty(
    {
    example: 'Password123!',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
  })
  password: string;
}
