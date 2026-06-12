import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleExampleModule } from './module-example/module-example.module';
import { PrismaModule } from './prisma/prisma.module';
import { VacantesModule } from './vacantes/vacantes.module';

@Module({
  imports: [ModuleExampleModule, PrismaModule, VacantesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
