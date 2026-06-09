import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleExampleModule } from './module-example/module-example.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ModuleExampleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
