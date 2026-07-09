-- AlterTable
ALTER TABLE "Vacante" ADD COLUMN     "experienciaMeses" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "EmpresaGrupoDiversidad" (
    "empresaId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "EmpresaGrupoDiversidad_pkey" PRIMARY KEY ("empresaId","grupoId")
);

-- CreateTable
CREATE TABLE "VacantePeso" (
    "vacanteId" TEXT NOT NULL,
    "pesoSkills" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "pesoNivel" DOUBLE PRECISION NOT NULL DEFAULT 0.3,
    "pesoExperiencia" DOUBLE PRECISION NOT NULL DEFAULT 0.2,

    CONSTRAINT "VacantePeso_pkey" PRIMARY KEY ("vacanteId")
);

-- AddForeignKey
ALTER TABLE "EmpresaGrupoDiversidad" ADD CONSTRAINT "EmpresaGrupoDiversidad_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresaGrupoDiversidad" ADD CONSTRAINT "EmpresaGrupoDiversidad_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoDiversidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacantePeso" ADD CONSTRAINT "VacantePeso_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
