import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  companyService,
  type CreateCompanyRequest,
  type CompanyResponse,
} from '../services/empresas.service';

export function useCompanyProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<CompanyResponse | null>(null);

  const submit = async (payload: CreateCompanyRequest) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    setData(null);

    try {
      const response = await companyService.createCompany(payload);
      setData(response);
      setIsSuccess(true);
      toast.success('Perfil de empresa creado correctamente');
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al crear el perfil';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
    setData(null);
  };

  return { submit, reset, isLoading, error, isSuccess, data };
}
