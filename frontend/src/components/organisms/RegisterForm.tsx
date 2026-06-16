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
  companyName: string;
  industry: string;
  website: string;
  country: string;
  city: string;
  diversityGoal: number;
}

// Tipo específico para errores (todos son strings)
type RegisterErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  companyName?: string;
  industry?: string;
  website?: string;
  country?: string;
  city?: string;
  diversityGoal?: string; // Ahora es string
};

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industry: '',
    website: '',
    country: '',
    city: '',
    diversityGoal: 0,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [generalError, setGeneralError] = useState<string>('');

  const industries = ['Tecnología', 'Finanzas', 'Salud', 'Educación', 'Retail', 'Consultoría', 'Otro'];
  const countries = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Perú', 'Uruguay', 'España', 'Otro'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'diversityGoal') {
      const numValue = parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Limpiar error del campo
    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) setGeneralError('');
  };

  const validateStep1 = (): boolean => {
    const newErrors: RegisterErrors = {};
    if (!formData.firstName) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email) {
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

  const validateStep2 = (): boolean => {
    const newErrors: RegisterErrors = {};
    if (!formData.companyName) newErrors.companyName = 'El nombre de la empresa es requerido';
    if (!formData.industry) newErrors.industry = 'La industria es requerida';
    if (!formData.country) newErrors.country = 'El país es requerido';
    if (!formData.city) newErrors.city = 'La ciudad es requerida';
    if (formData.diversityGoal < 0 || formData.diversityGoal > 100) {
      newErrors.diversityGoal = 'Ingresa un porcentaje válido (0-100)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setGeneralError('');
    try {
      await onSubmit(formData);
    } catch {
      setGeneralError('Error al registrar. Intenta nuevamente.');
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <form onSubmit={step === 1 ? (e) => e.preventDefault() : handleSubmit} className="space-y-6">
      {step === 1 && (
        <>
          <p className="text-body-medium text-text-secondary text-center mb-2">
            Cuéntanos un poco sobre usted
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
          <Button type="button" variant="primary" size="large" fullWidth onClick={handleNext} disabled={isLoading}>
            Siguiente
          </Button>
          <div className="mt-4 text-center space-y-2">
            <p className="text-body-small text-text-secondary">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-label-medium text-brand-secondary hover:text-brand-secondary-hover transition-colors">
                Iniciar Sesión
              </a>
            </p>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-body-medium text-text-secondary text-center mb-2">
            Complete la información de su organización
          </p>
          <InputField
            id="companyName"
            name="companyName"
            label="Nombre de la Empresa"
            type="text"
            placeholder="Ej: Mi Empresa S.A."
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
            required
            disabled={isLoading}
          />
          <div className="space-y-2">
            <label htmlFor="industry" className="block text-label-large text-text-primary">
              Industria <span className="text-badge-error-text">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary focus:border-input-focus outline-none transition-colors"
              disabled={isLoading}
            >
              <option value="">Selecciona una industria</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-label-small text-badge-error-text mt-1">{errors.industry}</p>
            )}
          </div>
          <InputField
            id="website"
            name="website"
            label="Sitio Web Corporativo"
            type="text"
            placeholder="https://www.empresa.com"
            value={formData.website}
            onChange={handleChange}
            error={errors.website}
            disabled={isLoading}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="country" className="block text-label-large text-text-primary">
                País <span className="text-badge-error-text">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary focus:border-input-focus outline-none transition-colors"
                disabled={isLoading}
              >
                <option value="">Selecciona un país</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.country && (
                <p className="text-label-small text-badge-error-text mt-1">{errors.country}</p>
              )}
            </div>
            <InputField
              id="city"
              name="city"
              label="Ciudad"
              type="text"
              placeholder="Ej: Buenos Aires"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
              disabled={isLoading}
            />
          </div>
          <InputField
            id="diversityGoal"
            name="diversityGoal"
            label="Objetivo de diversidad (%)"
            type="text"
            placeholder="Ej: 30"
            value={formData.diversityGoal ? String(formData.diversityGoal) : ''}
            onChange={handleChange}
            error={errors.diversityGoal}
            required
            disabled={isLoading}
          />
          {generalError && <ErrorMessage message={generalError} />}
          <div className="flex gap-4">
            <Button type="button" variant="secondary" size="large" onClick={handleBack} disabled={isLoading} className="flex-1">
              Atrás
            </Button>
            <Button type="submit" variant="primary" size="large" fullWidth isLoading={isLoading} className="flex-1">
              Registrar Empresa
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterForm;