import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email!: string;  // ← El ! indica que será asignado en tiempo de ejecución

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;  // ← El ! indica que será asignado en tiempo de ejecución
}