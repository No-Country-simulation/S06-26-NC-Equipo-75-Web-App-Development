import { apiClient } from './apiClient';

// Tipos según el backend
export interface Vacante {
  id: string;
  titulo: string;
  nivelRequerido: string;
  area: string;
  region: {
    id: string;
    nombre: string;
  };
  estado: string;
  descripcion?: string;
  diversidadMinima?: number;
  skills?: VacanteSkill[];
}

export interface VacanteCreate {
  titulo: string;
  nivelRequerido: string;   // antes era nivel
  area: string;
  regionId: string;          // antes era region
  descripcion?: string;
  diversidadMinima?: number;
  skillIds: string[];        // antes era skills
  pesosScore: {
    skills: number;
    nivel: number;
    experiencia: number;
  };
}

export interface VacanteSkill {
  skillId: string;
  obligatorio: boolean;
  skill?: {
    id: string;
    nombre: string;
    categoria: string;
  };
}

export interface ShortlistCandidate {
  id: string;
  candidatoId: string;
  score: number;
  skillsScore: number;
  experienciaScore: number;
  regionScore: number;
  badgeDiversidad: boolean;
  candidato: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    nivel: string;
    region: {
      id: string;
      nombre: string;
    };
    skills: { skill: { nombre: string } }[];
  };
}

export interface ShortlistResponse {
  vacante: Vacante;
  match: {
    totalAnalizados: number;
    candidatos: ShortlistCandidate[];
  };
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
      body: JSON.stringify({ status }),
    });
  },

  async executeMatch(id: string): Promise<ShortlistResponse> {
  return apiClient<ShortlistResponse>(`/vacantes/${id}/match`, {
    method: 'POST',
  });
},
};