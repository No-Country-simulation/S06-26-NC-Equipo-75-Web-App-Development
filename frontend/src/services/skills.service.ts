import { apiClient } from './apiClient';

export interface Skill {
  id: string;
  nombre: string;
}

export const skillsService = {
  async getAll(): Promise<Skill[]> {
    return apiClient<Skill[]>('/skills');
  },
};