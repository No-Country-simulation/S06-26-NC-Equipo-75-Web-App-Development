import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    // Validación mock (después la cambias por base de datos)
    if (email === 'test@test.com' && password === '123456') {
      const payload = {
        sub: '123',
        email: email,
        role: 'RECRUITER',
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: '123',
          email: email,
          role: 'RECRUITER',
        },
      };
    }
    
    throw new UnauthorizedException('Credenciales inválidas');
  }
}