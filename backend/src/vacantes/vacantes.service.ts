import { Injectable } from '@nestjs/common';
import { VacanteCreateDto } from './dto/vacante-create.dto';
import { VacanteUpdateDto } from './dto/vacante-update.dto';
import { VacanteUpdateStatusDto } from './dto/vacante-update-status.dto';
import { VacanteFiltersDto } from './dto/vacante-filters.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Prisma, VacancyStatus } from '@prisma/client';

@Injectable()
export class VacantesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: VacanteCreateDto) {
    const company = await this.prisma.empresa.findUnique({
      where: { id: dto.empresaId },
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

    return this.prisma.vacante.create({
      data: {
        empresaId: dto.empresaId,
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        nivelRequerido: dto.nivelRequerido,
        regionId: dto.regionId,
        diversidadMinima: dto.diversidadMinima,
        antiSesgo: dto.antiSesgo ?? false,
        estado: VacancyStatus.OPEN,

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
      where: { id },
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

  async update(id: string, dto: VacanteUpdateDto) {
    await this.findById(id);

    await this.prisma.vacante.update({
      where: { id },
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
        where: { vacanteId: id },
      });

      if (dto.skillIds.length > 0) {
        await this.prisma.vacanteSkill.createMany({
          data: dto.skillIds.map((skillId) => ({
            vacanteId: id,
            skillId,
          })),
        });
      }
    }

    return await this.findById(id);
  }

  async updateStatus(id: string, dto: VacanteUpdateStatusDto) {
    await this.findById(id);

    return this.prisma.vacante.update({
      where: { id },
      data: {
        estado: dto.status,
      },
    });
  }
}
