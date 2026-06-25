import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { CandidateLevel } from '@prisma/client';

export class CandidatoFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nivel del candidato',
    enum: CandidateLevel,
  })
  @IsOptional()
  @Transform(({ value }) => (value as string)?.toUpperCase())
  @IsEnum(CandidateLevel)
  nivel?: CandidateLevel;

  @ApiPropertyOptional({
    description: 'Filtrar por nombre',
  })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por región',
  })
  @IsOptional()
  @IsString()
  region?: string;
}
