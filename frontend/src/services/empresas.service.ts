import { apiClient } from './apiClient';

export interface CreateEmpresaPerfilPayload {
  nombre: string;
  industria: string;
  pais: string;
  ciudad: string;
  objetivoDiversidad: number;
  sitioWeb: string;
}

export interface EmpresaPerfilResponse {
  id: string;
  nombre: string;
  industria: string;
  pais: string;
  ciudad: string;
  objetivoDiversidad: number;
  sitioWeb: string;
}

export const empresasService = {
  async createProfile(
    data: CreateEmpresaPerfilPayload,
  ): Promise<EmpresaPerfilResponse> {
    return apiClient<EmpresaPerfilResponse>('/empresas/perfil', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
