import { Injectable } from '@nestjs/common';
import { VacanteCreateDto } from './dto/vacante-create.dto';
import { VacanteUpdateDto } from './dto/vacante-update.dto';
import { VacanteUpdateStatusDto } from './dto/vacante-update-status.dto';
import { VacanteFiltersDto } from './dto/vacante-filters.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CandidateLevel, Match, Prisma, VacancyStatus } from '@prisma/client';
import { ShortlistResponseDto } from './dto/vacanteShortlistCandidate.dto';
import { VacanteUpdatePesosDto } from './dto/vacante-update-pesos.dto';

const DEFAULT_PESO_SKILLS = 0.5;
const DEFAULT_PESO_NIVEL = 0.3;
const DEFAULT_PESO_EXPERIENCIA = 0.2;

@Injectable()
export class VacantesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(id_token: string, dto: VacanteCreateDto) {
    const usuarioEmpresa = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        usuarioId: id_token,
      },
    });

    if (!usuarioEmpresa) {
      throw new NotFoundException('User not found');
    }
    const company = await this.prisma.empresa.findUnique({
      where: { id: usuarioEmpresa.empresaId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const region = await this.prisma.region.findUnique({
      where: { id: dto.regionId },
    });

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    const skills = await this.prisma.skill.findMany({
      where: {
        id: {
          in: dto.skillIds,
        },
      },
    });

    if (skills.length !== dto.skillIds.length) {
      throw new BadRequestException('One or more skills do not exist');
    }

    const vacante = await this.prisma.vacante.create({
      data: {
        empresaId: usuarioEmpresa.empresaId,
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        nivelRequerido: dto.nivelRequerido,
        regionId: dto.regionId,
        diversidadMinima: dto.diversidadMinima,
        antiSesgo: dto.antiSesgo ?? false,
        estado: VacancyStatus.OPEN,
        experienciaMeses: dto.experienciaMeses ?? 0,

        skills: {
          create: dto.skillIds.map((skillId) => ({
            skillId,
          })),
        },
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        empresa: true,
        region: true,
      },
    });

    await this.prisma.vacantePeso.create({
      data: {
        vacanteId: vacante.id,
        pesoSkills: dto.pesoSkills ?? DEFAULT_PESO_SKILLS,
        pesoNivel: dto.pesoNivel ?? DEFAULT_PESO_NIVEL,
        pesoExperiencia: dto.pesoExperiencia ?? DEFAULT_PESO_EXPERIENCIA,
      },
    });
    return vacante;
  }

  async delete(idVacante: string, id_usuario: string) {
    await this.validateUserCompanyAccess(id_usuario, idVacante);

    return this.prisma.vacante.delete({
      where: { id: idVacante },
    });
  }

  async findAll(filters?: VacanteFiltersDto) {
    const where: Prisma.VacanteWhereInput = {};

    if (filters?.status) {
      where.estado = filters.status;
    }

    if (filters?.companyId) {
      where.empresaId = filters.companyId;
    }

    if (filters?.regionId) {
      where.regionId = filters.regionId;
    }

    return this.prisma.vacante.findMany({
      where,
      include: {
        empresa: true,
        region: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const vacancy = await this.prisma.vacante.findUnique({
      where: { id: id },
      include: {
        region: true,
        skills: {
          include: {
            skill: true,
          },
        },
        pesos: true,
        empresa: {
          include: {
            gruposDiversidad: {
              include: {
                grupo: true,
              },
            },
          },
        },
      },
    });

    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }

    return vacancy;
  }

  async findByCompany(companyId: string) {
    return this.prisma.vacante.findMany({
      where: {
        empresaId: companyId,
      },
      include: {
        region: true,
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });
  }

  async getCandidatos() {
    return await this.prisma.candidato.findMany({
      include: {
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
        region: true,
      },
    });
  }
  async getCandidatosByVancante(vacanteId: string, userId: string) {
    await this.validateUserCompanyAccess(userId, vacanteId);

    return await this.prisma.match.findMany({
      where: {
        vacanteId: vacanteId,
      },
      orderBy: {
        score: 'desc',
      },
      include: {
        candidato: true,
      },
    });
  }

  async getShortlist(
    vacanteId: string,
    userId: string,
  ): Promise<ShortlistResponseDto> {
    await this.validateUserCompanyAccess(userId, vacanteId);

    const matches = await this.prisma.match.findMany({
      where: { vacanteId },
      orderBy: { score: 'desc' },
      include: {
        candidato: {
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
        },
      },
    });
    return {
      vacanteId,
      total: matches.length,
      candidatos: matches.map((match) => ({
        id: match.candidato.id,
        nombre: match.candidato.nombre,
        apellido: match.candidato.apellido,
        score: match.score,

        skills: match.candidato.skills.map((s) => s.skill.nombre),

        nivel: match.candidato.nivel,

        badges: match.candidato.gruposDiversidad.map((g) => g.grupo.nombre),

        region: match.candidato.region.nombre,

        latitud: match.candidato.region.latitud,
        longitud: match.candidato.region.longitud,
      })),
    };
  }

  async runMatch(idVacante: string, idUsuario: string) {
    await this.validateUserCompanyAccess(idUsuario, idVacante);

    const vacancy = await this.findById(idVacante);
    const candidatos = await this.getCandidatos();

    const empresaGrupos = new Set(
      vacancy.empresa.gruposDiversidad.map((g) => g.grupoId),
    );

    const resultados: (Match & { candidato: any })[] = [];

    for (const candidato of candidatos) {
      const skillsScore = this.calculateSkillsScore(
        vacancy.skills,
        candidato.skills,
      );

      const levelScore = this.calculateLevelScore(
        vacancy.nivelRequerido,
        candidato.nivel,
      );

      const experienceScore = Math.min(
        candidato.experienciaMeses / vacancy.experienciaMeses,
        1,
      );

      const badgeDiversidad = candidato.gruposDiversidad.some((g) =>
        empresaGrupos.has(g.grupoId),
      );

      const score =
        skillsScore * (vacancy.pesos?.pesoSkills ?? DEFAULT_PESO_SKILLS) +
        levelScore * (vacancy.pesos?.pesoNivel ?? DEFAULT_PESO_NIVEL) +
        experienceScore *
          (vacancy.pesos?.pesoExperiencia ?? DEFAULT_PESO_EXPERIENCIA);

      const match = await this.prisma.match.upsert({
        where: {
          vacanteId_candidatoId: {
            vacanteId: idVacante,
            candidatoId: candidato.id,
          },
        },
        create: {
          vacanteId: idVacante,
          candidatoId: candidato.id,
          score,
          skillsScore,
          experienciaScore: experienceScore,
          regionScore: levelScore, // en el schema lo usan para nivel
          badgeDiversidad,
        },
        update: {
          score,
          skillsScore,
          experienciaScore: experienceScore,
          regionScore: levelScore,
          badgeDiversidad,
        },
      });

      resultados.push({ ...match, candidato });
    }

    resultados.sort((a, b) => b.score - a.score);

    return {
      totalAnalizados: candidatos.length,
      candidatos: resultados,
    };
  }

  private calculateSkillsScore(
    vacancySkills: any[],
    candidateSkills: any[],
  ): number {
    const requiredSkills = vacancySkills.map((s) => s.skillId);

    const matched = candidateSkills.filter((s) =>
      requiredSkills.includes(s.skillId),
    ).length;

    // if (matched === requiredSkills.length) {
    //   return 1;
    // }

    // if (matched > 0) {
    //   return 0.5;
    // }

    return matched / requiredSkills.length; // 6 match de candidato / 10 skills requeridas = 0.6
  }

  private calculateLevelScore(
    required: CandidateLevel,
    candidate: CandidateLevel,
  ): number {
    if (required === candidate) {
      return 1;
    }

    const levels = [
      CandidateLevel.TRAINEE,
      CandidateLevel.JUNIOR,
      CandidateLevel.SEMI_SENIOR,
      CandidateLevel.SENIOR,
      CandidateLevel.LEAD,
    ];

    const diff = Math.abs(levels.indexOf(required) - levels.indexOf(candidate));

    return diff === 1 ? 0.5 : 0; // si la diferencia es de un nivel, devuelve 0.5, si es mayor, devuelve 0
  }

  async update(id_vacante: string, dto: VacanteUpdateDto, id_usuario: string) {
    await this.validateUserCompanyAccess(id_usuario, id_vacante);

    await this.prisma.vacante.update({
      where: { id: id_vacante },
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        nivelRequerido: dto.nivelRequerido,
        regionId: dto.regionId,
        diversidadMinima: dto.diversidadMinima,
        antiSesgo: dto.antiSesgo,
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        region: true,
        empresa: true,
      },
    });
    if (dto.skillIds !== undefined) {
      await this.prisma.vacanteSkill.deleteMany({
        where: { vacanteId: id_vacante },
      });

      if (dto.skillIds.length > 0) {
        await this.prisma.vacanteSkill.createMany({
          data: dto.skillIds.map((skillId) => ({
            vacanteId: id_vacante,
            skillId,
          })),
        });
      }
    }

    return await this.findById(id_vacante);
  }

  async updateStatus(
    id_vacancy: string,
    dto: VacanteUpdateStatusDto,
    id_usuario: string,
  ) {
    await this.validateUserCompanyAccess(id_usuario, id_vacancy);

    return this.prisma.vacante.update({
      where: { id: id_vacancy },
      data: {
        estado: dto.status,
      },
    });
  }

  async validateUserCompanyAccess(userId: string, vacancyId: string) {
    const vacancy = await this.prisma.vacante.findUnique({
      where: { id: vacancyId },
    });

    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }

    const pertenece = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        usuarioId: userId,
        empresaId: vacancy.empresaId,
      },
    });

    if (!pertenece) {
      throw new ForbiddenException(
        'You are not allowed to modify this vacancy',
      );
    }

    return vacancy;
  }
  async addSkill( vacanteId: string,skillId: string,userId: string,) {
    await this.validateUserCompanyAccess(
      userId,
      vacanteId,
    );

    const skill =
      await this.prisma.skill.findUnique({
        where: { id: skillId },
      });

    if (!skill) {
      throw new NotFoundException(
        'Skill not found',
      );
    }

    const existente =
      await this.prisma.vacanteSkill.findUnique({
        where: {
          vacanteId_skillId: {
            vacanteId,
            skillId,
          },
        },
      });

    if (existente) {
      throw new BadRequestException(
        'Skill already assigned to vacancy',
      );
    }

    return this.prisma.vacanteSkill.create({
      data: {
        vacanteId,
        skillId,
      },
    });
  } 
  
  async removeSkill(vacanteId: string,skillId: string,userId: string){
    await this.validateUserCompanyAccess(
      userId,
      vacanteId,
    );

    const relacion =  await this.prisma.vacanteSkill.findUnique({
      where: {
        vacanteId_skillId: {
          vacanteId,
          skillId,
        },
      },
    });

    if (!relacion) {
      throw new NotFoundException(
        'Skill not assigned to vacancy',
      );
    }

    return this.prisma.vacanteSkill.delete({
      where: {
        vacanteId_skillId: {
          vacanteId,
          skillId,
        },
      },
    });
  }

  async getSkills(vacanteId: string) {
    const vacante = await this.prisma.vacante.findUnique({
      where: { id: vacanteId },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
    });

    if (!vacante) {
      throw new NotFoundException(
      'Vacancy not found',
      );
    }

    return vacante.skills;
  }

  async getWeights(vacanteId: string) {
    const pesos = await this.prisma.vacantePeso.findUnique({
      where: {
        vacanteId,
      },
    });

    if (!pesos) {
      throw new NotFoundException('Vacancy weights not found');
    }

    return pesos;
  }

  async updateWeights(
    vacanteId: string,
    dto: VacanteUpdatePesosDto,
    userId: string,
  ) {
    await this.validateUserCompanyAccess(userId, vacanteId);

    const pesosActuales =
      await this.prisma.vacantePeso.findUnique({
        where: {
          vacanteId,
        },
      });

    if (!pesosActuales) {
      throw new NotFoundException(
        'Vacancy weights not found',
      );
    }

    const nuevosPesos = {
      pesoSkills:
        dto.pesoSkills ?? pesosActuales.pesoSkills,

      pesoNivel:
        dto.pesoNivel ?? pesosActuales.pesoNivel,

      pesoExperiencia:
        dto.pesoExperiencia ??
        pesosActuales.pesoExperiencia,
    };

    const suma =
      nuevosPesos.pesoSkills +
      nuevosPesos.pesoNivel +
      nuevosPesos.pesoExperiencia;

    if (Math.abs(suma - 1) > 0.0001) {
      throw new BadRequestException(
        'The sum of the weights must be equal to 1',
      );
    }

    return await this.prisma.vacantePeso.update({
      where: {
        vacanteId,
      },
      data: nuevosPesos,
    });
  }

}
