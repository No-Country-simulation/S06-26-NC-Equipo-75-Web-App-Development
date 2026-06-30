import { apiClient } from './apiClient';

// Tipos según el backend
export interface Vacante {
  id: string;
  titulo: string;
  nivel: string; // "Trainee" | "Junior" | ...
  region: string;
  estado: 'Abierto' | 'Pausado' | 'Cerrado';
  // otros campos que devuelva el backend
}

export interface VacanteCreate {
  titulo: string;
  nivel: string;
  region: string;
  // ... resto de campos obligatorios según POST /vacantes
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