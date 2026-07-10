import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CandidateLevel } from '@prisma/client';

export class VacanteCreateDto {
  @ApiProperty()
  @IsString()
  titulo: string;

  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty({ enum: CandidateLevel })
  @IsEnum(CandidateLevel)
  nivelRequerido: CandidateLevel;

  @ApiProperty()
  @IsUUID()
  regionId: string;

  @ApiProperty({
    type: [String],
    description: 'IDs de skills requeridas',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  skillIds: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  diversidadMinima?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  antiSesgo?: boolean;

  @ApiPropertyOptional({
    description: 'Experiencia mínima requerida en meses',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  experienciaMeses?: number;

  @ApiPropertyOptional({
    description: 'Peso de las skills en el cálculo del score (0 a 1)',
    default: 0.5,
  })
  @IsOptional()
  @IsNumber()
  pesoSkills?: number;

  @ApiPropertyOptional({
    description: 'Peso del nivel requerido en el cálculo del score (0 a 1)',
    default: 0.3,
  })
  @IsOptional()
  @IsNumber()
  pesoNivel?: number;

  @ApiPropertyOptional({
    description: 'Peso de la experiencia en el cálculo del score (0 a 1)',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  pesoExperiencia?: number;
}
