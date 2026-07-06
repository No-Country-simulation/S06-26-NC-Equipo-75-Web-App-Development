import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class SkillCreateDto {
  @ApiProperty({
    example: 'JavaScript',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({
    example: 'Frontend',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoria?: string;
}