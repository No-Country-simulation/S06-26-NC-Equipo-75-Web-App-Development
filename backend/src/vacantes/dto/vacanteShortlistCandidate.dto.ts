import { ApiProperty } from '@nestjs/swagger';
import { CandidateLevel, SelectionStatus } from '@prisma/client';

export class ShortlistCandidateDto {
  @ApiProperty({
    description: 'ID del candidato',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre completo del candidato',
    example: 'Juan Pérez',
  })
  nombre: string;

  @ApiProperty({
    description: 'Score de compatibilidad con la vacante',
    example: 92.5,
  })
  score: number;

  @ApiProperty({
    type: [String],
    description: 'Skills del candidato',
    example: ['NestJS', 'TypeScript', 'PostgreSQL'],
  })
  skills: string[];

  @ApiProperty({
    enum: CandidateLevel,
    description: 'Nivel profesional del candidato',
    example: CandidateLevel.SEMI_SENIOR,
  })
  nivel: CandidateLevel;

  @ApiProperty({
    type: [String],
    description: 'Badges o grupos de diversidad detectados',
    example: ['LGBTQ+', 'Persona con discapacidad'],
  })
  badges: string[];

  @ApiProperty({
    description: 'Región del candidato',
    example: 'Buenos Aires',
  })
  region: string;

  @ApiProperty({
    required: false,
    nullable: true,
    description: 'Latitud de la ubicación del candidato',
    example: -34.6037,
  })
  latitud?: number;

  @ApiProperty({
    required: false,
    nullable: true,
    description: 'Longitud de la ubicación del candidato',
    example: -58.3816,
  })
  longitud?: number;

  @ApiProperty({
    enum: SelectionStatus,
    description: 'Estado de selección del candidato',
    example: SelectionStatus.APPLIED,
  })
  estado?: SelectionStatus;
}

export class ShortlistResponseDto {
  vacanteId: string;

  total: number;

  candidatos: ShortlistCandidateDto[];
}
