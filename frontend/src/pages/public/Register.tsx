import React, { useState } from 'react';
import AuthLayout from '../../components/templates/AuthLayout.tsx';
import RegisterForm, {
  type RegisterFormData,
} from '../../components/organisms/RegisterForm';
import { useAuth } from '../../contexts/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';

const Register: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { success } = useToast();

  if (isAuthenticated && !authLoading) {
    return <Navigate to="/onboarding/company" replace />;
  }

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await signup({
        nombre: data.firstName,
        apellido: data.lastName,
        email: data.email,
        password: data.password,
      });

      success('Registro exitoso! Revisa tu correo para confirmar.');
      navigate('/onboarding/company');
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
