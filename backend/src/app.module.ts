import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleExampleModule } from './module-example/module-example.module';

@Module({
  imports: [ModuleExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
