-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'RECRUITER');

-- CreateEnum
CREATE TYPE "CandidateLevel" AS ENUM ('TRAINEE', 'JUNIOR', 'SEMI_SENIOR', 'SENIOR', 'LEAD');

-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('OPEN', 'CLOSED', 'PAUSED');

-- CreateEnum
CREATE TYPE "SelectionStatus" AS ENUM ('APPLIED', 'CONTACTED', 'INTERVIEW', 'REJECTED', 'HIRED');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "UserRole" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "industria" TEXT,
    "sitioWeb" TEXT,
    "pais" TEXT,
    "ciudad" TEXT,
    "objetivoDiversidad" DOUBLE PRECISION,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioEmpresa" (
    "usuarioId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "UsuarioEmpresa_pkey" PRIMARY KEY ("usuarioId","empresaId")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoDiversidad" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "GrupoDiversidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidato" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "nivel" "CandidateLevel" NOT NULL,
    "experienciaMeses" INTEGER NOT NULL,
    "linkedin" TEXT,
    "portfolio" TEXT,
    "regionId" TEXT NOT NULL,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatoGrupoDiversidad" (
    "candidatoId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "CandidatoGrupoDiversidad_pkey" PRIMARY KEY ("candidatoId","grupoId")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatoSkill" (
    "candidatoId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,

    CONSTRAINT "CandidatoSkill_pkey" PRIMARY KEY ("candidatoId","skillId")
);

-- CreateTable
CREATE TABLE "Vacante" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivelRequerido" "CandidateLevel" NOT NULL,
    "regionId" TEXT NOT NULL,
    "diversidadMinima" DOUBLE PRECISION,
    "antiSesgo" BOOLEAN NOT NULL DEFAULT false,
    "estado" "VacancyStatus" NOT NULL,

    CONSTRAINT "Vacante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacanteSkill" (
    "vacanteId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "obligatorio" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "VacanteSkill_pkey" PRIMARY KEY ("vacanteId","skillId")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "vacanteId" TEXT NOT NULL,
    "candidatoId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "skillsScore" DOUBLE PRECISION NOT NULL,
    "experienciaScore" DOUBLE PRECISION NOT NULL,
    "regionScore" DOUBLE PRECISION NOT NULL,
    "badgeDiversidad" BOOLEAN NOT NULL,
    "fechaMatch" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcesoSeleccion" (
    "id" TEXT NOT NULL,
    "vacanteId" TEXT NOT NULL,
    "candidatoId" TEXT NOT NULL,
    "estado" "SelectionStatus" NOT NULL,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcesoSeleccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricaDiversidad" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "vacantesPublicadas" INTEGER NOT NULL,
    "candidatosEvaluados" INTEGER NOT NULL,
    "candidatosDiversidad" INTEGER NOT NULL,
    "contratacionesTotales" INTEGER NOT NULL,
    "contratacionesDiversidad" INTEGER NOT NULL,

    CONSTRAINT "MetricaDiversidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightRegion" (
    "id" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "concentracionTalento" INTEGER NOT NULL,
    "coberturaRed" DOUBLE PRECISION NOT NULL,
    "perfilesDisponibles" INTEGER NOT NULL,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsightRegion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GrupoDiversidad_nombre_key" ON "GrupoDiversidad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Match_vacanteId_candidatoId_key" ON "Match"("vacanteId", "candidatoId");

-- AddForeignKey
ALTER TABLE "UsuarioEmpresa" ADD CONSTRAINT "UsuarioEmpresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEmpresa" ADD CONSTRAINT "UsuarioEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidato" ADD CONSTRAINT "Candidato_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatoGrupoDiversidad" ADD CONSTRAINT "CandidatoGrupoDiversidad_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatoGrupoDiversidad" ADD CONSTRAINT "CandidatoGrupoDiversidad_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoDiversidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatoSkill" ADD CONSTRAINT "CandidatoSkill_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatoSkill" ADD CONSTRAINT "CandidatoSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacante" ADD CONSTRAINT "Vacante_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacante" ADD CONSTRAINT "Vacante_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacanteSkill" ADD CONSTRAINT "VacanteSkill_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacanteSkill" ADD CONSTRAINT "VacanteSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesoSeleccion" ADD CONSTRAINT "ProcesoSeleccion_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "Vacante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesoSeleccion" ADD CONSTRAINT "ProcesoSeleccion_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricaDiversidad" ADD CONSTRAINT "MetricaDiversidad_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightRegion" ADD CONSTRAINT "InsightRegion_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
