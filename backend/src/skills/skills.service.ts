import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { SkillCreateDto } from './dto/skill-create.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeNombre(nombre: string): string {
    return nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()
      .trim();
  }

  async create(dto: SkillCreateDto) {
    const nombreNormalizado =
      this.normalizeNombre(dto.nombre);

    const skills =
      await this.prisma.skill.findMany();

    const existe = skills.some(
      skill =>
        this.normalizeNombre(skill.nombre) ===
        nombreNormalizado,
    );

    if (existe) {
      throw new BadRequestException(
        'Skill already exists',
      );
    }

    return this.prisma.skill.create({
      data: {
        nombre: dto.nombre.trim(),
        categoria: dto.categoria?.trim() || null,
      },
    });
  }

  async findAll() {
    return this.prisma.skill.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });
  }

  async findById(id: string) {
    const skill =
        await this.prisma.skill.findUnique({
        where: { id },
        });

    if (!skill) {
        throw new NotFoundException(
        'Skill not found',
        );
    }

    return skill;
  }


}