import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmpresaCreateDto } from './dto/empresa-create.dto';
import { EmpresaUpdateDto } from './dto/empresa-update.dto';
import { VacancyStatus, SelectionStatus } from '@prisma/client';

const PERCENTAGE_MULTIPLIER = 100;

@Injectable()
export class EmpresasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: EmpresaCreateDto) {
    const existingCompany = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        usuarioId: userId,
      },
    });

    if (existingCompany) {
      throw new BadRequestException(
        'User already belongs to a company',
      );
    }
    const empresa = await this.prisma.empresa.create({
      data: {
        nombre: dto.nombre,
        industria: dto.industria,
        pais: dto.pais,
        ciudad: dto.ciudad,
        objetivoDiversidad: dto.objetivoDiversidad,
        sitioWeb: dto.sitioWeb,
      },
    });

    await this.prisma.usuarioEmpresa.create({
      data: {
        usuarioId: userId,
        empresaId: empresa.id,
      },
    });

    return empresa;
  }

  async findDashboard(companyId: string, userId: string) {
    const existingCompany = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        empresaId: companyId,
      },
      include: {
        empresa: true,
      },
    });

    if (!existingCompany) {
      throw new BadRequestException(
        'User does not belong to this company',
      );
    }

    await this.validateUserCompanyAccess(userId, companyId);

    // 7 días atrás
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const [
      activeVacancies,
      newCandidates,
      interviews,
      totalHired,
      diversityHired,
    ] = await Promise.all([
      // Vacantes activas
      this.prisma.vacante.count({
        where: {
          empresaId: companyId,
          estado: VacancyStatus.OPEN,
        },
      }),

      // Candidatos nuevos
      this.prisma.candidato.count({
        where: {
          fechaRegistro: { gte: lastWeek },
        },
      }),

      // Entrevistas
      this.prisma.procesoSeleccion.count({
        where: {
          estado: SelectionStatus.INTERVIEW,
          vacante: {
            empresaId: companyId,
          },
          fechaActualizacion: {
            gte: lastWeek,
          },
        },
      }),

      // Contrataciones totales
      this.prisma.procesoSeleccion.count({
        where: {
          estado: SelectionStatus.HIRED,
          vacante: {
            empresaId: companyId,
          },
        },
      }),

      // Contrataciones con badge
      this.prisma.procesoSeleccion.count({
        where: {
          estado: SelectionStatus.HIRED,
          vacante: {
            empresaId: companyId,
          },
          candidato: {
            gruposDiversidad: {
              some: {},
            },
          },
        },
      }),
    ]);

    const objetivoDiversidad = existingCompany.empresa.objetivoDiversidad ?? 0;

    const porcentajeDiversidad =
      totalHired === 0 ? 0 : (diversityHired / totalHired) * 100;

    return {
      activeVacancies,
      newCandidates,
      interviews,

      esgProgress: {
        currentPercentage: Number(porcentajeDiversidad.toFixed(2)),
        targetPercentage: objetivoDiversidad,
        reached: porcentajeDiversidad >= objetivoDiversidad,
      },
    };
  }

  async getWeeklyMatches(companyId: string, userId: string) {
    await this.validateUserCompanyAccess(userId, companyId);

    // 7 días atrás
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const matches = await this.prisma.match.findMany({
      where: {
        vacante: {
          empresaId: companyId,
        },
        fechaMatch: {
          gte: lastWeek,
        },
      },
      select: {
        fechaMatch: true,
      },
    });

    const weeklyMatches = Object.values(
      matches.reduce(
        (acc, match) => {
          const date = match.fechaMatch.toISOString().split('T')[0];

          if (!acc[date]) {
            acc[date] = {
              date,
              totalMatches: 0,
            };
          }

          acc[date].totalMatches++;

          return acc;
        },
        {} as Record<string, { date: string; totalMatches: number }>,
      ),
    );

    return weeklyMatches;
  }

  async findEsgDashboard(companyId: string, userId: string) {
    await this.validateUserCompanyAccess(userId, companyId);

    const [
      totalContacted,
      diversityContacted,
      totalHired,
      diversityHired,
      totalShortlist,
      diversityShortlist,
    ] = await Promise.all([
      this.prisma.procesoSeleccion.count({
        where: {
          estado: SelectionStatus.CONTACTED,
          vacante: {
            empresaId: companyId,
          },
        },
      }),

      this.prisma.procesoSeleccion.count({
        where: {
          estado: SelectionStatus.CONTACTED,
          vacante: {
            empresaId: companyId,
          },
          candidato: {
            gruposDiversidad: {
              some: {},
            },
          },
        },
      }),

      this.prisma.procesoSeleccion.count({
        where: {
          estado: SelectionStatus.HIRED,
          vacante: {
            empresaId: companyId,
          },
        },
      }),

      this.prisma.procesoSeleccion.count({
        where: {
          estado: SelectionStatus.HIRED,
          vacante: {
            empresaId: companyId,
          },
          candidato: {
            gruposDiversidad: {
              some: {},
            },
          },
        },
      }),

      this.prisma.match.count({
        where: {
          vacante: {
            empresaId: companyId,
          },
        },
      }),

      this.prisma.match.count({
        where: {
          vacante: {
            empresaId: companyId,
          },
          badgeDiversidad: true,
        },
      }),
    ]);

    const diversityContactRate =
      totalContacted === 0
        ? 0
        : (diversityContacted / totalContacted) * PERCENTAGE_MULTIPLIER;

    const diversityHiringRate =
      totalHired === 0
        ? 0
        : (diversityHired / totalHired) * PERCENTAGE_MULTIPLIER;

    const averageDiversityRate =
      totalShortlist === 0
        ? 0
        : (diversityShortlist / totalShortlist) * PERCENTAGE_MULTIPLIER;

    const abandonmentRate =
      totalShortlist === 0
        ? 0
        : ((totalShortlist - totalContacted) / totalShortlist) *
          PERCENTAGE_MULTIPLIER;

    return {
      diversityContactRate: Number(diversityContactRate.toFixed(2)),
      diversityHiringRate: Number(diversityHiringRate.toFixed(2)),
      averageDiversityRate: Number(averageDiversityRate.toFixed(2)),
      abandonmentRate: Number(abandonmentRate.toFixed(2)),
    };
  }

  async findBadgeDistribution(companyId: string, userId: string) {
    const company = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        usuarioId: userId,
        empresaId: companyId,
      },
    });

    if (!company) {
      throw new BadRequestException(
        'User does not belong to this company',
      );
    }

    await this.validateUserCompanyAccess(userId, companyId);

    const totalCandidatesWithBadge =
      await this.prisma.candidatoGrupoDiversidad.groupBy({
        by: ['candidatoId'],
      });

    const categories = await this.prisma.grupoDiversidad.findMany({
      include: {
        candidatos: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    const totalBadgedCandidates = totalCandidatesWithBadge.length;

    return {
      totalCandidatesWithBadge: totalBadgedCandidates,

      categories: categories.map((category) => {
        const candidateCount = category.candidatos.length;

        return {
          id: category.id,
          name: category.nombre,
          candidateCount,
          percentage:
            totalBadgedCandidates === 0
              ? 0
              : Number(
                  (
                    (candidateCount / totalBadgedCandidates) *
                    PERCENTAGE_MULTIPLIER
                  ).toFixed(2),
                ),
        };
      }),
    };
  }

  async findAll() {
    return this.prisma.empresa.findMany({
      include: {
        usuarios: true,
        gruposDiversidad: {
          include: {
            grupo: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id },
      include: {
        usuarios: true,
        vacantes: true,
        gruposDiversidad: {
          include: {
            grupo: true,
          },
        },
      },
    });

    if (!empresa) {
      throw new NotFoundException('Company not found');
    }

    return empresa;
  }

  async update(id: string, dto: EmpresaUpdateDto, userId: string,) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id },
    });

    if (!empresa) {
      throw new NotFoundException('Company not found');
    }

    await this.validateUserCompanyAccess(
      userId,
      id,
    );

    return this.prisma.empresa.update({
      where: { id },
      data: {
        nombre: dto.nombre,
        industria: dto.industria,
        pais: dto.pais,
        ciudad: dto.ciudad,
        objetivoDiversidad: dto.objetivoDiversidad,
        sitioWeb: dto.sitioWeb,
      },
    });
  }

  async delete(userId: string) {
    const existingCompany = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        usuarioId: userId,
      },
    });

    if (!existingCompany) {
      throw new BadRequestException('User does not belong to any company');
    }

    await this.validateUserCompanyAccess(userId, existingCompany.empresaId);

    return this.prisma.empresa.delete({
      where: { id: existingCompany.empresaId },
    });
  }

  async validateUserCompanyAccess(userId: string, companyId: string) {
    const company = await this.prisma.empresa.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const pertenece = await this.prisma.usuarioEmpresa.findFirst({
      where: {
        usuarioId: userId,
        empresaId: companyId,
      },
    });

    if (!pertenece) {
      throw new ForbiddenException(
        'You are not allowed to modify this company',
      );
    }

    return company;
  }
  
  async addGrupoDiversidad( empresaId: string,grupoId: string,userId: string,) {
    await this.validateUserCompanyAccess(
      userId,
      empresaId,
    );

    const grupo =
      await this.prisma.grupoDiversidad.findUnique({
        where: { id: grupoId },
      });

    if (!grupo) {
      throw new NotFoundException(
        'Diversity group not found',
      );
    }

    const existente =
      await this.prisma.empresaGrupoDiversidad.findUnique({
        where: {
          empresaId_grupoId: {
            empresaId,
            grupoId,
          },
        },
      });

    if (existente) {
      throw new BadRequestException(
        'Group already assigned to company',
      );
    }

    return this.prisma.empresaGrupoDiversidad.create({
      data: {
        empresaId,
        grupoId,
      },
    });
  } 
  
  async removeGrupoDiversidad(empresaId: string,grupoId: string,userId: string){
    await this.validateUserCompanyAccess(
      userId,
      empresaId,
    );

    const relacion =  await this.prisma.empresaGrupoDiversidad.findUnique({
      where: {
        empresaId_grupoId: {
          empresaId,
          grupoId,
        },
      },
    });

    if (!relacion) {
      throw new NotFoundException(
        'Group not assigned to company',
      );
    }

    await this.prisma.empresaGrupoDiversidad.delete({
      where: {
        empresaId_grupoId: {
          empresaId,
          grupoId,
        },
      },
    });
  }
}
