import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ReclutadorCreateDto } from "./dto/reclutador-create.dto";
import * as bcrypt from 'bcrypt';
import { UserRole } from "@prisma/client";

@Injectable()
export class ReclutadoresService {
  constructor(private readonly prisma: PrismaService) {}

  private async getEmpresaIdByUserId(userId: string): Promise<string> {
    const usuarioEmpresa = await this.prisma.usuarioEmpresa.findFirst({
        where: { usuarioId: userId },
    });
    if (!usuarioEmpresa) {
        throw new BadRequestException('User does not belong to any company');
    }
    return usuarioEmpresa.empresaId;
  }

  async create(userId: string, dto: ReclutadorCreateDto) {
    const empresaId = await this.getEmpresaIdByUserId(userId);

    const existingUser = await this.prisma.usuario.findUnique({
        where: {
        email: dto.email,
        },
    });

    if (existingUser) {
        throw new BadRequestException(
        'User with this email already exists',
        );
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const recruiter = await this.prisma.usuario.create({
        data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        passwordHash,
        rol: UserRole.RECRUITER,
        },
    });

    await this.prisma.usuarioEmpresa.create({
        data: {
        usuarioId: recruiter.id,
        empresaId,
        },
    });

    return {
        id: recruiter.id,
        nombre: recruiter.nombre,
        apellido: recruiter.apellido,
        email: recruiter.email,
        rol: recruiter.rol,
    };
  }

  async findAll(userId: string) {
    const empresaId = await this.getEmpresaIdByUserId(userId);

    return this.prisma.usuario.findMany({
        where: {
        rol: UserRole.RECRUITER,
        empresas: {
            some: {
            empresaId,
            },
        },
        },
        select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
        },
    });
  }

  async findById(userId: string, recruiterId: string) {
    const empresaId = await this.getEmpresaIdByUserId(userId);

    const recruiter = await this.prisma.usuario.findFirst({
        where: {
        id: recruiterId,
        rol: UserRole.RECRUITER,
        empresas: {
            some: {
            empresaId,
            },
        },
        },
        select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
        },
    });

    if (!recruiter) {
        throw new NotFoundException(
        'Recruiter not found',
        );
    }

    return recruiter;
  }

}
