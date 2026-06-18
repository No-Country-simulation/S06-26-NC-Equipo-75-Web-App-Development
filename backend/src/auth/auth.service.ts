import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordValida = await bcrypt.compare(
      loginDto.password,
      usuario.passwordHash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.rol,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(dto: RegisterDto) {
    const existingUser = await this.prisma.usuario.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con ese correo');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        passwordHash,
        rol: UserRole.ADMIN,
      },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.rol,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }
}
