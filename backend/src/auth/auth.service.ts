import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

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
}
