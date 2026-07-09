import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout';
import RegisterCompanyForm, {
  type RegisterCompanyFormData,
} from '../../components/organisms/RegisterCompanyForm';
import { useAuth } from '../../contexts/useAuth';
import { companyService } from '../../services/empresas.service';
import { useToast } from '../../hooks/useToast';

const RegisterCompany: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { success } = useToast();

  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (data: RegisterCompanyFormData) => {
    setIsLoading(true);
    try {
      // Aquí iría la llamada al endpoint de registro de empresa
      // await api.registerCompany(data);
      await companyService.createCompany({
        nombre: data.companyName,
        industria: data.industry,
        sitioWeb: data.website,
        pais: data.country,
        ciudad: data.city,
        objetivoDiversidad: data.diversityGoal,
      });

      console.log('Datos de registro de empresa:', data);
      success('Empresa registrada exitosamente!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Register company error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Registrar Empresa">
      <RegisterCompanyForm onSubmit={handleSubmit} isLoading={isLoading} />

      <div className="mt-6 text-center">
        <p className="text-body-small text-text-secondary">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="text-label-medium text-brand-secondary hover:text-brand-secondary-hover transition-colors"
          >
            Iniciar Sesión
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterCompany;
