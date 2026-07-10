import { IsUUID } from 'class-validator';

export class EmpresaGrupoDiversidadDto {
  @IsUUID()
  grupoId!: string;
}