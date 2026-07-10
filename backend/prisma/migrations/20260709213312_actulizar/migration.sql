-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_vacanteId_fkey";

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
