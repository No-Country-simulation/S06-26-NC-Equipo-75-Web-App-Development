import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({
    description: 'Nombre de la región o ciudad',
    example: 'Buenos Aires',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'País al que pertenece la región',
    example: 'Argentina',
  })
  @IsString()
  @IsNotEmpty()
  pais: string;

  @ApiProperty({
    description: 'Latitud geográfica',
    example: -34.6037,
  })
  @Type(() => Number)
  @IsNumber()
  latitud: number;

  @ApiProperty({
    description: 'Longitud geográfica',
    example: -58.3816,
  })
  @Type(() => Number)
  @IsNumber()
  longitud: number;
}