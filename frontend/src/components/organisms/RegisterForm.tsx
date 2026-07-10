import React, { useState } from 'react';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';
import ErrorMessage from '../atoms/ErrorMessage';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    if (generalError) {
      setGeneralError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setGeneralError('');

    try {
      await onSubmit(formData);
    } catch {
      setGeneralError('Error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-body-medium text-text-secondary text-center mb-2">
        Cuéntanos un poco sobre ti
      </p>

      <InputField
        id="firstName"
        name="firstName"
        label="Nombre"
        type="text"
        placeholder="Tu nombre"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
        required
        disabled={isLoading}
      />

      <InputField
        id="lastName"
        name="lastName"
        label="Apellido"
        type="text"
        placeholder="Tu apellido"
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
        required
        disabled={isLoading}
      />

      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="ejemplo@email.com"
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

      <InputField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
        disabled={isLoading}
      />

      {generalError && <ErrorMessage message={generalError} />}

      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        isLoading={isLoading}
      >
        Crear Cuenta
      </Button>

      <div className="mt-4 text-center">
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
    </form>
  );
};

export default RegisterForm;
