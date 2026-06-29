import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { GruposDiversidadController } from './grupos-diversidad.controller';
import { GruposDiversidadService } from './grupos-diversidad.service';

@Module({
  imports: [AuthModule],
  controllers: [GruposDiversidadController],
  providers: [GruposDiversidadService],
})
export class GruposDiversidadModule {}