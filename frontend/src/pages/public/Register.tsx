import React, { useState } from 'react';
import AuthLayout from '../../components/templates/AuthLayout.tsx';
import RegisterForm, {
  type RegisterFormData,
} from '../../components/organisms/RegisterForm';
import { useAuth } from '../../contexts/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated && !authLoading) {
    return <Navigate to="/vacancies" replace />;
  }

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Aquí iría la llamada al endpoint de registro
      // await api.register(data);
      await signup({
        nombre: data.firstName,
        apellido: data.lastName,
        email: data.email,
        password: data.password,
      });
      console.log('Datos de registro:', data);
      alert('Registro exitoso! Revisa tu correo para confirmar.');
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
