import { apiClient } from './apiClient';

export interface CreateCompanyRequest {
  nombre: string;
  industria: string;
  pais: string;
  ciudad: string;
  objetivoDiversidad: number;
  sitioWeb: string;
}

export interface UpdateCompanyRequest {
  nombre?: string;
  industria?: string;
  pais?: string;
  ciudad?: string;
  objetivoDiversidad?: number;
  sitioWeb?: string;
}

export interface GrupoDiversidad {
  id: string;
  nombre: string;
}

export interface CompanyResponse {
  id: string;
  nombre: string;
  industria: string;
  pais: string;
  ciudad: string;
  objetivoDiversidad: number;
  sitioWeb: string | null;

  gruposDiversidad?: {
    empresaId: string;
    grupoId: string;
    grupo: GrupoDiversidad;
  }[];
}

export const companyService = {
  // POST /empresas/perfil
  async createCompany(data: CreateCompanyRequest): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>('/empresas/perfil', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // GET /empresas/{id}
  async getCompanyById(companyId: string): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(`/empresas/${companyId}`);
  },

  // GET /empresas
  async getCompanies(): Promise<CompanyResponse[]> {
    return apiClient<CompanyResponse[]>('/empresas');
  },

  // PATCH /empresas/{id}/perfil
  async updateCompany(
    companyId: string,
    data: UpdateCompanyRequest,
  ): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(`/empresas/${companyId}/perfil`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // PATCH /empresas/{id}/grupoDiversidad
  async addDiversityGroup(
    companyId: string,
    grupoId: string,
  ): Promise<CompanyResponse> {
    return apiClient<CompanyResponse>(
      `/empresas/${companyId}/grupoDiversidad`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          grupoId,
        }),
      },
    );
  },

  // DELETE /empresas/{id}/grupoDiversidad/{grupoId}
  async removeDiversityGroup(
    companyId: string,
    grupoId: string,
  ): Promise<void> {
    return apiClient<void>(
      `/empresas/${companyId}/grupoDiversidad/${grupoId}`,
      {
        method: 'DELETE',
      },
    );
  },
};
