import React, { useState } from 'react';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';
import ErrorMessage from '../atoms/ErrorMessage';

export interface RecruiterFormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface RecruiterFormErrors {
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
}

interface RecruiterFormProps {
  onSubmit: (data: RecruiterFormData) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

const RecruiterForm: React.FC<RecruiterFormProps> = ({
  onSubmit,
  onClose,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<RecruiterFormData>({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<RecruiterFormErrors>({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof RecruiterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    if (generalError) {
      setGeneralError('');
    }
  };

  const validate = () => {
    const newErrors: RecruiterFormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingrese un email válido.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setGeneralError('');
      await onSubmit(formData);
    } catch {
      setGeneralError(
        'No fue posible crear el reclutador. Intenta nuevamente.',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        id="nombre"
        name="nombre"
        label="Nombre"
        placeholder="Juan"
        value={formData.nombre}
        onChange={handleChange}
        error={errors.nombre}
        disabled={isLoading}
        required
      />

      <InputField
        id="apellido"
        name="apellido"
        label="Apellido"
        placeholder="Pérez"
        value={formData.apellido}
        onChange={handleChange}
        error={errors.apellido}
        disabled={isLoading}
        required
      />

      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="juan@empresa.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isLoading}
        required
      />

      <InputField
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        disabled={isLoading}
        required
      />

      {generalError && <ErrorMessage message={generalError} />}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="primary"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>

        <Button type="submit" variant="primary" isLoading={isLoading}>
          Crear Reclutador
        </Button>
      </div>
    </form>
  );
};

export default RecruiterForm;
