import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class GrupoDiversidadCreateDto {
  @ApiProperty({
    example: 'Indigenas',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}