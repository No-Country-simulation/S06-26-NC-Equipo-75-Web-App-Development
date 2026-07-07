import { apiClient } from './apiClient';

export interface Region {
  id: string;
  nombre: string;   // suponemos que el DTO tiene este campo; ajustalo si difiere
}

export const regionService = {
  async getAll(): Promise<Region[]> {
    return apiClient<Region[]>('/region');
  },
};