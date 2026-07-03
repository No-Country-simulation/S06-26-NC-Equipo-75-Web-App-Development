import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class SkillCreateDto {
  @ApiProperty({
    example: 'JavaScript',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;
}