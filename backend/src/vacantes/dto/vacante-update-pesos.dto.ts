import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class VacanteUpdatePesosDto {
  @ApiPropertyOptional({
    description: 'Peso de las skills',
    minimum: 0,
    maximum: 1,
    example: 0.5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  pesoSkills?: number;

  @ApiPropertyOptional({
    description: 'Peso del nivel',
    minimum: 0,
    maximum: 1,
    example: 0.3,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  pesoNivel?: number;

  @ApiPropertyOptional({
    description: 'Peso de la experiencia',
    minimum: 0,
    maximum: 1,
    example: 0.2,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  pesoExperiencia?: number;
}