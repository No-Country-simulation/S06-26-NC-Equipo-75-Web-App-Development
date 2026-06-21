-- DropForeignKey
ALTER TABLE "VacanteSkill" DROP CONSTRAINT "VacanteSkill_vacanteId_fkey";

-- AddForeignKey
ALTER TABLE "VacanteSkill" ADD CONSTRAINT "VacanteSkill_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
