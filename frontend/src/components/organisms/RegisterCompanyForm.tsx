import React, { useState } from 'react';
import InputField from '../molecules/InputField';
import Button from '../atoms/Button';
import ErrorMessage from '../atoms/ErrorMessage';

export interface RegisterCompanyFormData {
  companyName: string;
  industry: string;
  website: string;
  country: string;
  city: string;
  diversityGoal: number;
}

export interface RegisterCompanyFormProps {
  onSubmit: (data: RegisterCompanyFormData) => Promise<void>;
  isLoading?: boolean;
}

const RegisterCompanyForm: React.FC<RegisterCompanyFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<RegisterCompanyFormData>({
    companyName: '',
    industry: '',
    website: '',
    country: '',
    city: '',
    diversityGoal: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterCompanyFormData, string>>>({});
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
    if (errors[name as keyof RegisterCompanyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) setGeneralError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterCompanyFormData, string>> = {};
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setGeneralError('');
    try {
      await onSubmit(formData);
    } catch {
      setGeneralError('Error al registrar la empresa. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <Button type="submit" variant="primary" size="large" fullWidth isLoading={isLoading}>
        Registrar Empresa
      </Button>
    </form>
  );
};

export default RegisterCompanyForm;