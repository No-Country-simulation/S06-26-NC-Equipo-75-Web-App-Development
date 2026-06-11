import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login() {
    const payload = {
      sub: '123',
      email: 'test@test.com',
      role: 'RECRUITER',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}