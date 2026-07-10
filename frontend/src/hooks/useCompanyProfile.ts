import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  companyService,
  type CreateCompanyRequest,
  type UpdateCompanyRequest,
  type CompanyResponse,
} from '../services/empresas.service';

export function useCompanyProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CompanyResponse | null>(null);

  const getProfile = async (companyId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await companyService.getCompanyById(companyId);

      setData(response);

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al cargar empresa';

      setError(message);
      toast.error(message);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (payload: CreateCompanyRequest) => {
    setIsLoading(true);

    try {
      const response = await companyService.createCompany(payload);

      setData(response);

      toast.success('Perfil de empresa creado correctamente');

      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (
    companyId: string,
    payload: UpdateCompanyRequest,
  ) => {
    setIsLoading(true);

    try {
      const response = await companyService.updateCompany(companyId, payload);

      setData(response);

      toast.success('Perfil actualizado correctamente');

      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al actualizar empresa';

      toast.error(message);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,

    getProfile,
    createProfile,
    updateProfile,
  };
}
