import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CandidatoFiltersDto } from './dto/candidato-filters.dto';

@Injectable()
export class CandidatosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: CandidatoFiltersDto) {
    const { nombre, nivel, region } = filters;

    return this.prisma.candidato.findMany({
      where: {
        nombre: nombre
          ? {
              contains: nombre,
              mode: 'insensitive',
            }
          : undefined,
        nivel,
        region: region
          ? {
              nombre: {
                contains: region,
                mode: 'insensitive',
              },
            }
          : undefined,
      },
      include: {
        region: true,
        skills: {
          include: {
            skill: true,
          },
        },
        gruposDiversidad: {
          include: {
            grupo: true,
          },
        },
      },
    });
  }

  async findDetail(id: string) {
    const candidato = await this.prisma.candidato.findUnique({
      where: {
        id,
      },
      include: {
        region: true,
        skills: {
          include: {
            skill: true,
          },
        },
        gruposDiversidad: {
          include: {
            grupo: true,
          },
        },
      },
    });

    if (!candidato) {
      throw new NotFoundException(`No se encontró un candidato con id ${id}`);
    }

    return {
      id: candidato.id,
      nombre: candidato.nombre,
      apellido: candidato.apellido,
      nivel: candidato.nivel,
      experienciaMeses: candidato.experienciaMeses,
      linkedin: candidato.linkedin,
      portfolio: candidato.portfolio,
      region: candidato.region.nombre,

      badges: candidato.gruposDiversidad.map((grupo) => grupo.grupo.nombre),

      skills: candidato.skills.map((skill) => ({
        nombre: skill.skill.nombre,
        nivel: skill.nivel,
      })),

      // Mock hasta implementar el matching
      score: 0,
      desgloseScore: {
        skills: 0,
        experiencia: 0,
        region: 0,
        diversidad: 0,
      },
    };
  }
}
