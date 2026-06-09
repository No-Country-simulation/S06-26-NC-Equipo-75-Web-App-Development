import { Module } from '@nestjs/common';
import { ModuleExampleController } from './module-example.controller';
import { ModuleExampleService } from './module-example.service';

@Module({
  controllers: [ModuleExampleController],
  providers: [ModuleExampleService],
})
export class ModuleExampleModule {}
