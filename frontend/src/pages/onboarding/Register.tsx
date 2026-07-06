import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout';
import { useAuth } from '../../contexts/useAuth';
import type { RegisterCompanyFormData } from '../../components/organisms/RegisterCompanyForm';
import RegisterCompanyForm from '../../components/organisms/RegisterCompanyForm';

const RegisterCompany: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated && !authLoading) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const handleSubmit = async (data: RegisterCompanyFormData) => {
    setIsLoading(true);
    try {
      // Aquí iría la llamada al endpoint de registro de empresa
      // await api.registerCompany(data);
      console.log('Datos de registro de empresa:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Empresa registrada exitosamente!');
      // Redirigir al dashboard
      // window.location.href = '/dashboard';
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
          <a href="/login" className="text-label-medium text-brand-secondary hover:text-brand-secondary-hover transition-colors">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterCompany;
