import { apiClient } from './apiClient';

// ------------------
// Tipos
// ------------------

export interface Recruiter {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'RECRUITER';
}

export interface CreateRecruiterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

// ------------------
// Servicio
// ------------------

export const recruiterService = {
  /**
   * Obtener todos los reclutadores
   */
  async getRecruiters(): Promise<Recruiter[]> {
    return apiClient<Recruiter[]>('/reclutadores');
  },

  /**
   * Obtener un reclutador por ID
   */
  async getRecruiterById(id: string): Promise<Recruiter> {
    return apiClient<Recruiter>(`/reclutadores/${id}`);
  },

  /**
   * Crear reclutador
   */
  async createRecruiter(data: CreateRecruiterRequest): Promise<Recruiter> {
    return apiClient<Recruiter>('/reclutadores', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
