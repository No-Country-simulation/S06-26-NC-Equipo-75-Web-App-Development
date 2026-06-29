import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleExampleModule } from './module-example/module-example.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VacantesModule } from './vacantes/vacantes.module';
import { EmpresasModule } from './empresas/empresas.module';
import { GruposDiversidadModule } from './grupos-diversidad/grupos-diversidad.module';
import { RegionModule } from './region/region.module';
import { ReclutadoresModule } from './reclutadores/reclutadores.module';

@Module({
  imports: [
    ModuleExampleModule,
    PrismaModule,
    AuthModule,
    VacantesModule,
    EmpresasModule,
    GruposDiversidadModule,
    RegionModule,
    ReclutadoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
