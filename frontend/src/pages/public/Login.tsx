import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../../components/templates/AuthLayout';
import LoginForm from '../../components/organisms/LoginForm';
import { useAuth } from '../../contexts/useAuth';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout 
      title="Bienvenido" 
      subtitle="Inicia sesión para continuar"
    >
      <LoginForm />
      
      <div className="mt-6 text-center">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-label-medium text-brand-secondary hover:text-brand-secondary-hover transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </AuthLayout>
  );
};

export default Login;