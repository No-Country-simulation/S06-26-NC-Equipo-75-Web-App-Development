import { apiClient } from './apiClient';

export interface CreateCompanyRequest {
  nombre: string;
  industria: string;
  pais: string;
  ciudad: string;
  objetivoDiversidad: number;
  sitioWeb: string;
}

export interface CompanyResponse {
  id: string;
  nombre: string;
  industria: string;
  pais: string;
  ciudad: string;
  objetivoDiversidad: number;
  sitioWeb: string;
}

export const companyService = {
  async createCompany(data: CreateCompanyRequest): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>('/empresas/perfil', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getCompanyById(companyId: string): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(`/empresas/${companyId}`);
  },
};
