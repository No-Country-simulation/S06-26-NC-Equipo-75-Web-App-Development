import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Conecta a la base de datos al iniciar el módulo
  async onModuleInit() {
    await this.$connect();
  }

  // Cierra la conexión de forma segura al apagar la app
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
