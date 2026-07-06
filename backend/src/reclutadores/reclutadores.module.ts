import {Module} from '@nestjs/common';
import {ReclutadoresController} from './reclutadores.controller';
import {ReclutadoresService} from './reclutadores.service';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ReclutadoresController],
  providers: [ReclutadoresService],
})
export class ReclutadoresModule {}