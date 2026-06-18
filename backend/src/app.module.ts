import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleExampleModule } from './module-example/module-example.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VacantesModule } from './vacantes/vacantes.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [
    ModuleExampleModule,
    PrismaModule,
    AuthModule,
    VacantesModule,
    RegionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
