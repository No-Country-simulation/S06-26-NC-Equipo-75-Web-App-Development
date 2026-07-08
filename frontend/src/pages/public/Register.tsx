import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout.tsx';
import RegisterForm, { type RegisterFormData } from '../../components/organisms/RegisterForm';
import { useAuth } from '../../contexts/useAuth';

const Register: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated && !authLoading) {
  return <Navigate to="/vacancies" replace />;
  }

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Aquí iría la llamada al endpoint de registro
      // await api.register(data);
      console.log('Datos de registro:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Registro exitoso! Revisa tu correo para confirmar.');
      // window.location.href = '/login';
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

return (
  <AuthLayout title="Crear Cuenta">
    <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
  </AuthLayout>
);
};

export default Register;
