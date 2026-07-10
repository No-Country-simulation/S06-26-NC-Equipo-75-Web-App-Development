import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';

export class RegionFiltersDto {
  @ApiPropertyOptional({
    description: 'ID de la región',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({
    description: 'País de la región',
  })
  @IsOptional()
  @IsString()
  pais?: string;

  @ApiPropertyOptional({
    description: 'Latitud de la región',
    example: -34.6037,
  })
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional({
    description: 'Longitud de la región',
    example: -58.3816,
  })
  @IsOptional()
  @IsNumber()
  longitud?: number;
}
