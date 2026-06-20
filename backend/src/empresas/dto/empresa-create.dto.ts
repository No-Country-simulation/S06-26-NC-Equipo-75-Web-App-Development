import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class EmpresaCreateDto {
  @ApiProperty()
  @IsString()
  nombre!: string;

  @ApiProperty()
  @IsString()
  industria!: string;

  @ApiProperty()
  @IsString()
  pais!: string;

  @ApiProperty()
  @IsString()
  ciudad!: string;

  @ApiProperty({
    description: 'Objetivo de diversidad en porcentaje',
    example: 30,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  objetivoDiversidad!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  sitioWeb?: string;
}