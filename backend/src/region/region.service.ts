import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegionFiltersDto } from './dto/RegionFilters.dto';
import { CreateRegionDto } from './dto/RegionCreate.fto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters?: RegionFiltersDto) {
    const where: Prisma.RegionWhereInput = {};

    if (filters?.id) {
      where.id = filters.id;
    }

    if (filters?.pais) {
      where.pais = filters.pais;
    }

    if (filters?.latitud) {
      where.latitud = filters.latitud;
    }

    if (filters?.longitud) {
      where.longitud = filters.longitud;
    }

    return this.prisma.region.findMany({ where });
  }

  async findById(id: string) {
    const region = await this.prisma.region.findUnique({
      where: { id },
    });

    if (!region) {
      throw new NotFoundException('No se encontró una región con id ${id}');
    }

    return region;
  }

  async create(dto: CreateRegionDto) {
    const existingRegion = await this.prisma.region.findFirst({
      where: {
        nombre: dto.nombre,
        pais: dto.pais,
      },
    });

    if (existingRegion) {
      throw new ConflictException('La región ya existe');
    }

    return this.prisma.region.create({
      data: {
        nombre: dto.nombre,
        pais: dto.pais,
        latitud: dto.latitud,
        longitud: dto.longitud,
      },
    });
  }
}
