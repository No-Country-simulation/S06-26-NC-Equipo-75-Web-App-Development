-- DropForeignKey
ALTER TABLE "UsuarioEmpresa" DROP CONSTRAINT "UsuarioEmpresa_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioEmpresa" DROP CONSTRAINT "UsuarioEmpresa_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "UsuarioEmpresa" ADD CONSTRAINT "UsuarioEmpresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioEmpresa" ADD CONSTRAINT "UsuarioEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
