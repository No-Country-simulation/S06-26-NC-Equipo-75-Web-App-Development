import React, { useState } from 'react';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';
import ErrorMessage from '../atoms/ErrorMessage';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [generalError, setGeneralError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Ingresa un email válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) setGeneralError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setGeneralError('');
    try {
      await onSubmit(formData);
    } catch {
      setGeneralError('Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        id="email"
        name="email"
        label="Correo electrónico"
        type="email"
        placeholder="ejemplo@empresa.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        disabled={isLoading}
      />
      
      <InputField
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        disabled={isLoading}
      />
      
      {generalError && <ErrorMessage message={generalError} />}
      
      <Button type="submit" variant="primary" size="large" fullWidth isLoading={isLoading}>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginForm;