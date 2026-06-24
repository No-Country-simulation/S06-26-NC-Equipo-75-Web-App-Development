import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmpresaCreateDto } from './dto/empresa-create.dto';
import { EmpresaUpdateDto } from './dto/empresa-update.dto';

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

  async findAll() {
    return this.prisma.empresa.findMany({
      include: {
        usuarios: true,
      },
    });
  }

  async findById(id: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id },
      include: {
        usuarios: true,
        vacantes: true,
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

  async validateUserCompanyAccess(userId: string,companyId: string,) {
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
}
