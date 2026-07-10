import { apiClient } from './apiClient';

// ------------------
// Tipos
// ------------------

export interface GrupoDiversidad {
  id: string;
  nombre: string;
}

export interface CreateGrupoDiversidadRequest {
  nombre: string;
}

// ------------------
// Servicio
// ------------------

export const grupoDiversidadService = {
  /**
   * Obtener todos los grupos de diversidad
   */
  async getGruposDiversidad(): Promise<GrupoDiversidad[]> {
    return apiClient<GrupoDiversidad[]>('/grupos-diversidad');
  },

  /**
   * Obtener un grupo de diversidad por ID
   */
  async getGrupoDiversidadById(id: string): Promise<GrupoDiversidad> {
    return apiClient<GrupoDiversidad>(`/grupos-diversidad/${id}`);
  },

  /**
   * Crear grupo de diversidad
   */
  async createGrupoDiversidad(
    data: CreateGrupoDiversidadRequest,
  ): Promise<GrupoDiversidad> {
    return apiClient<GrupoDiversidad>('/grupos-diversidad', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
