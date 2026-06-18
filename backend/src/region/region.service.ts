import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegionFiltersDto } from './dto/RegionFilters.dto';
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
}
