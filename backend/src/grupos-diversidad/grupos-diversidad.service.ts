import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { GrupoDiversidadCreateDto } from './dto/grupo-diversidad-create.dto';

@Injectable()
export class GruposDiversidadService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeNombre(nombre: string): string {
    return nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()
      .trim();
  }

  async create(dto: GrupoDiversidadCreateDto) {
    const nombreNormalizado =
      this.normalizeNombre(dto.nombre);

    const grupos =
      await this.prisma.grupoDiversidad.findMany();

    const existe = grupos.some(
      grupo =>
        this.normalizeNombre(grupo.nombre) ===
        nombreNormalizado,
    );

    if (existe) {
      throw new BadRequestException(
        'Diversity group already exists',
      );
    }

    return this.prisma.grupoDiversidad.create({
      data: {
        nombre: dto.nombre.trim(),
      },
    });
  }

  async findAll() {
    return this.prisma.grupoDiversidad.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });
  }

    async findById(id: string) {
    const grupo =
        await this.prisma.grupoDiversidad.findUnique({
        where: { id },
        });

    if (!grupo) {
        throw new NotFoundException(
        'Diversity group not found',
        );
    }

    return grupo;
    }
}