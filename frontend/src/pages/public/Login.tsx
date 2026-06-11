import React, { useState } from 'react';
import AuthLayout from '../../components/templates/AuthLayout';
import LoginForm, { type LoginFormData } from '../../components/organisms/LoginForm';
import { authApi } from '../../services/api.service';

interface LoginProps {
  onLogin?: (data: LoginFormData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // Usando el servicio centralizado
      const response = await authApi.login(data.email, data.password);
      
      // Guardar token
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Callback de éxito
      if (onLogin) {
        onLogin(data);
      }
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Bienvenido" 
      subtitle="Inicia sesión para continuar"
    >
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      
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