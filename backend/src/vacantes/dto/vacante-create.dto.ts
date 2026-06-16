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
}
