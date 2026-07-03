import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  Building2,
  CheckCircle2,
  Plus,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import InputField from '../../components/molecules/InputField';
interface CompanyFormData {
  companyName: string;
  industry: string;
  website: string;
  country: string;
  city: string;
}

type MeasurementPeriod = 'Mensual' | 'Trimestral' | 'Anual';

const DEFAULT_DIVERSITY_CATEGORIES = [
  'Mujer en tech',
  'Región periférica',
  'Diversidad étnica',
  'Discapacidad',
  'Primera generación universitaria',
];

const CompanyManagement: React.FC = () => {
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    industry: '',
    website: '',
    country: '',
    city: '',
  });
  const [minimumDiversity, setMinimumDiversity] = useState(35);
  const [measurementPeriod, setMeasurementPeriod] =
    useState<MeasurementPeriod>('Trimestral');
  const [diversityTagInput, setDiversityTagInput] = useState('');
  const [isCustomDiversityEnabled, setIsCustomDiversityEnabled] =
    useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [savedSummary, setSavedSummary] = useState<string>('');

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const handleAddDiversityTag = () => {
    const normalizedTag = diversityTagInput.trim();
    if (!normalizedTag) return;

    setSelectedCategories((current) => {
      const alreadyExists = current.some(
        (category) => category.toLowerCase() === normalizedTag.toLowerCase(),
      );

      return alreadyExists ? current : [...current, normalizedTag];
    });
    setDiversityTagInput('');
  };

  const handleRemoveDiversityTag = (category: string) => {
    setSelectedCategories((current) =>
      current.filter((item) => item !== category),
    );
  };

  const esgSummary = useMemo(() => {
    const categories =
      selectedCategories.length > 0
        ? selectedCategories.join(', ')
        : 'Sin categorias seleccionadas';

    return {
      categories,
      impactTracking:
        'Seguimiento de impacto configurado para contratacion, representacion y evolucion de diversidad.',
      minimum: `${minimumDiversity}%`,
      period: measurementPeriod,
    };
  }, [measurementPeriod, minimumDiversity, selectedCategories]);

  const handleCancel = () => {
    setFormData({
      companyName: '',
      industry: '',
      website: '',
      country: '',
      city: '',
    });
    setMinimumDiversity(35);
    setMeasurementPeriod('Trimestral');
    setDiversityTagInput('');
    setIsCustomDiversityEnabled(false);
    setSelectedCategories([]);
    setSavedSummary('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSummary(
      `Configuracion ESG guardada para ${formData.companyName || 'la empresa'}.`,
    );
  };

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <main className="flex-1 p-6 md:p-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-badge-esg-bg text-badge-esg-text">
                  <Building2 className="h-5 w-5" />
                </span>
                <h1 className="text-h1 font-bold leading-h1 text-text-primary">
                  Gestion de Empresa
                </h1>
              </div>
              <p className="mt-2 text-body-medium leading-body-medium text-text-secondary">
                Administra los datos principales y la identidad de la organizacion.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm"
            >
              <div className="mb-6">
                <h2 className="text-h3 font-semibold leading-h3 text-text-primary">
                  Detalles principales
                </h2>
                <p className="mt-1 text-body-small leading-body-small text-text-secondary">
                  Estos datos identifican a la empresa dentro de ImpactHire.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  id="companyName"
                  name="companyName"
                  label="Nombre de la empresa"
                  placeholder="Ej: ImpactHire"
                  value={formData.companyName}
                  onChange={handleCompanyChange}
                  required
                />

                <InputField
                  id="industry"
                  name="industry"
                  label="Industria"
                  placeholder="Ej: Tecnologia"
                  value={formData.industry}
                  onChange={handleCompanyChange}
                  required
                />

                <InputField
                  id="website"
                  name="website"
                  label="Sitio web corporativo"
                  placeholder="https://www.empresa.com"
                  value={formData.website}
                  onChange={handleCompanyChange}
                />

                <InputField
                  id="country"
                  name="country"
                  label="Pais"
                  placeholder="Ej: Argentina"
                  value={formData.country}
                  onChange={handleCompanyChange}
                  required
                />

                <InputField
                  id="city"
                  name="city"
                  label="Ciudad"
                  placeholder="Ej: Buenos Aires"
                  value={formData.city}
                  onChange={handleCompanyChange}
                  required
                />
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border-light pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="medium"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" size="medium">
                  Guardar
                </Button>
              </div>
            </form>

            <aside className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm">
              <div className="mb-6 flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-badge-diversity-bg text-badge-diversity-text">
                  <SlidersHorizontal className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-h3 font-semibold leading-h3 text-text-primary">
                    Metas ESG y diversidad
                  </h2>
                  <p className="mt-1 text-body-small leading-body-small text-text-secondary">
                    Configura parametros de seguimiento de impacto.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="minimumDiversity"
                      className="text-label-large font-medium leading-label-large text-text-primary"
                    >
                      Minimo de diversidad
                    </label>
                    <span className="rounded-full bg-badge-esg-bg px-3 py-1 text-badge font-semibold leading-badge text-badge-esg-text">
                      {minimumDiversity}%
                    </span>
                  </div>
                  <input
                    id="minimumDiversity"
                    type="range"
                    min="0"
                    max="100"
                    value={minimumDiversity}
                    onChange={(e) => setMinimumDiversity(Number(e.target.value))}
                    className="mt-3 w-full accent-brand-secondary"
                  />
                </section>

                <section>
                  <p className="mb-3 text-label-large font-medium leading-label-large text-text-primary">
                    Categorias de Diversidad Prioritarias
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_DIVERSITY_CATEGORIES.map((category) => (
                        <label
                          key={category}
                          className={`inline-flex cursor-pointer items-center rounded-full bg-[#144A4D] px-4 py-2 text-label-small font-semibold leading-label-small text-white transition-all ${
                            selectedCategories.includes(category)
                              ? 'ring-2 ring-brand-secondary ring-offset-2 ring-offset-bg-primary'
                              : 'opacity-85 hover:opacity-100'
                          }`}
                        >
                          <span>{category}</span>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="sr-only"
                          />
                        </label>
                      ))}

                      <label
                        className={`inline-flex cursor-pointer items-center rounded-full bg-[#144A4D] px-4 py-2 text-label-small font-semibold leading-label-small text-white transition-all ${
                          isCustomDiversityEnabled
                            ? 'ring-2 ring-brand-secondary ring-offset-2 ring-offset-bg-primary'
                            : 'opacity-85 hover:opacity-100'
                        }`}
                      >
                        <span>Otros</span>
                        <input
                          type="checkbox"
                          checked={isCustomDiversityEnabled}
                          onChange={(e) =>
                            setIsCustomDiversityEnabled(e.target.checked)
                          }
                          className="sr-only"
                        />
                      </label>
                    </div>

                    {isCustomDiversityEnabled && (
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Input
                          id="diversityTag"
                          name="diversityTag"
                          placeholder="Definir otra diversidad"
                          value={diversityTagInput}
                          onChange={(e) => setDiversityTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddDiversityTag();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="medium"
                          onClick={handleAddDiversityTag}
                          className="shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                          Agregar
                        </Button>
                      </div>
                    )}

                    <div className="flex min-h-11 flex-wrap gap-2 rounded-lg border border-border-light bg-bg-tertiary p-3">
                      {selectedCategories.length > 0 ? (
                        selectedCategories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex max-w-full items-center gap-2 rounded-full bg-bg-primary px-3 py-1.5 text-label-small font-medium leading-label-small text-text-primary shadow-sm"
                          >
                            <span className="truncate">{category}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveDiversityTag(category)}
                              className="rounded-full text-text-secondary transition-colors hover:text-badge-error-text"
                              aria-label={`Eliminar etiqueta ${category}`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        ))
                      ) : (
                        <p className="text-body-small leading-body-small text-text-secondary">
                          Todavia no hay etiquetas agregadas.
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                <section>
                  <label
                    htmlFor="measurementPeriod"
                    className="mb-2 block text-label-large font-medium leading-label-large text-text-primary"
                  >
                    Periodo de medicion
                  </label>
                  <select
                    id="measurementPeriod"
                    value={measurementPeriod}
                    onChange={(e) =>
                      setMeasurementPeriod(e.target.value as MeasurementPeriod)
                    }
                    className="w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium leading-body-medium text-text-primary outline-none transition-colors hover:border-input-hover focus:border-input-focus"
                  >
                    <option>Mensual</option>
                    <option>Trimestral</option>
                    <option>Anual</option>
                  </select>
                </section>

                <section className="rounded-lg bg-bg-tertiary p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-brand-tertiary" />
                    <h3 className="text-h4 font-semibold leading-h4 text-text-primary">
                      Resumen ESG
                    </h3>
                  </div>
                  <dl className="space-y-3 text-body-small leading-body-small">
                    <div>
                      <dt className="font-medium text-text-primary">
                        Seguimiento de impacto
                      </dt>
                      <dd className="mt-1 text-text-secondary">
                        {esgSummary.impactTracking}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">
                        Minimo configurado
                      </dt>
                      <dd className="mt-1 text-text-secondary">
                        {esgSummary.minimum}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">
                        Categorias
                      </dt>
                      <dd className="mt-1 text-text-secondary">
                        {esgSummary.categories}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">
                        Periodo
                      </dt>
                      <dd className="mt-1 text-text-secondary">
                        {esgSummary.period}
                      </dd>
                    </div>
                  </dl>
                </section>

                {savedSummary && (
                  <div className="flex items-start gap-2 rounded-lg bg-badge-success-bg p-3 text-body-small leading-body-small text-badge-success-text">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{savedSummary}</span>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyManagement;
