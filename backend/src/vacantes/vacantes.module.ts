import { Module } from '@nestjs/common';
import { VacantesController } from './vacantes.controller';
import { VacantesService } from './vacantes.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VacantesController],
  providers: [VacantesService],
})
export class VacantesModule {}
