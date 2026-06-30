import { apiClient } from './apiClient';

// Tipos según el backend
export interface Vacante {
  id: string;
  titulo: string;
  nivel: string;
  area: string;
  region: string;
  descripcion?: string;
  diversidadMinima?: number;
  skills: string[];
  estado: 'Abierto' | 'Pausado' | 'Cerrado';
}

export interface VacanteCreate {
  titulo: string;
  nivelRequerido: string;   // antes era nivel
  area: string;
  regionId: string;          // antes era region
  descripcion?: string;
  diversidadMinima?: number;
  skillIds: string[];        // antes era skills
}

export const vacantesService = {
  async getAll(): Promise<Vacante[]> {
    return apiClient<Vacante[]>('/vacantes');
  },

  async getById(id: string): Promise<Vacante> {
    return apiClient<Vacante>(`/vacantes/${id}`);
  },

  async create(vacante: VacanteCreate): Promise<Vacante> {
    return apiClient<Vacante>('/vacantes', {
      method: 'POST',
      body: JSON.stringify(vacante),
    });
  },

  async update(id: string, vacante: Partial<VacanteCreate>): Promise<Vacante> {
    return apiClient<Vacante>(`/vacantes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(vacante),
    });
  },

  async delete(id: string): Promise<void> {
    return apiClient<void>(`/vacantes/${id}`, { method: 'DELETE' });
  },

  async getByCompany(companyId: string): Promise<Vacante[]> {
    return apiClient<Vacante[]>(`/vacantes/company/${companyId}`);
  },

  async updateStatus(
    id: string,
    status: 'Abierto' | 'Pausado' | 'Cerrado'
  ): Promise<Vacante> {
    return apiClient<Vacante>(`/vacantes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ estado: status }),
    });
  },
};