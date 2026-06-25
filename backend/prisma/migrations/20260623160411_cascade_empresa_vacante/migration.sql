-- DropForeignKey
ALTER TABLE "Vacante" DROP CONSTRAINT "Vacante_empresaId_fkey";

-- AddForeignKey
ALTER TABLE "Vacante" ADD CONSTRAINT "Vacante_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
