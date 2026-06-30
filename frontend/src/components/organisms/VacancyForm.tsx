import { useEffect, useState } from 'react';
import InputField from '../molecules/InputField';
import { X, ChevronDown, Plus } from 'lucide-react';
import type { VacanteCreate } from '../../services/vacantes.service';
import { regionService, type Region } from '../../services/region.service';

interface VacancyFormProps {
  onSubmit: (data: VacanteCreate) => Promise<void>;
  isSubmitting?: boolean;
  onClose: () => void;
}

// ─── Toggle subcomponent ──────────────────────────────
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-label-large font-medium leading-label-large text-input-label">
          {label}
        </label>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-brand-secondary' : 'bg-border-medium'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

// ─── Custom select with styled arrow ────────────────
function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-input-border bg-input-bg p-3 pr-10 text-body-medium text-text-primary outline-none focus:border-input-focus"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="rounded-full bg-gray-400 p-0.5 text-white">
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

// ─── Datos estáticos ─────────────────────────────────
const NIVELES = ['Trainee', 'Junior', 'Semi Senior', 'Senior', 'Lead'] as const;
const AREAS = [
  'Frontend', 'Backend', 'Full Stack', 'Data Science', 'Machine Learning',
  'DevOps', 'QA', 'Product Management', 'UX/UI', 'Ciberseguridad', 'Otro',
] as const;

const NIVEL_MAP: Record<string, string> = {
  Trainee: 'TRAINEE',
  Junior: 'JUNIOR',
  'Semi Senior': 'SEMI_SENIOR',
  Senior: 'SENIOR',
  Lead: 'LEAD',
};

export default function VacancyForm({
  onSubmit,
  isSubmitting = false,
  onClose,
}: VacancyFormProps) {
  const [titulo, setTitulo] = useState('');
  const [nivel, setNivel] = useState<string>('Junior');
  const [area, setArea] = useState<string>('Frontend');
  const [regionId, setRegionId] = useState(''); // ahora almacena UUID
  const [descripcion, setDescripcion] = useState('');
  const [diversidadMinima, setDiversidadMinima] = useState<number>(30);
  const [skills, setSkills] = useState<string[]>([]);        // ← vuelve a ser texto libre
  const [skillInput, setSkillInput] = useState('');
  const [antisesgo, setAntisesgo] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Datos desde la API
  const [regiones, setRegiones] = useState<Region[]>([]);

  useEffect(() => {
    regionService.getAll().then(setRegiones).catch(() => setRegiones([]));
  }, []);

  // Manejo de skills (texto libre)
  const handleAddSkill = () => {
    const sk = skillInput.trim();
    if (!sk) return;
    if (!skills.includes(sk)) {
      setSkills((prev) => [...prev, sk]);
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (sk: string) => {
    setSkills((prev) => prev.filter((s) => s !== sk));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!titulo.trim()) newErrors.titulo = 'El título es obligatorio';
    if (skills.length === 0) newErrors.skills = 'Agrega al menos una skill';
    if (!regionId) newErrors.region = 'La región es obligatoria';
    if (diversidadMinima < 0 || diversidadMinima > 100)
      newErrors.diversidadMinima = 'Valor entre 0 y 100';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const vacanteData: VacanteCreate = {
      titulo: titulo.trim(),
      nivelRequerido: NIVEL_MAP[nivel] || 'JUNIOR',
      area,
      regionId,
      descripcion: descripcion.trim() || undefined,
      diversidadMinima,
      skillIds: skills,   // ← enviamos los strings tal cual
    };

    try {
      await onSubmit(vacanteData);
      // Limpiar formulario
      setTitulo('');
      setNivel('Junior');
      setArea('Frontend');
      setRegionId('');
      setDescripcion('');
      setDiversidadMinima(30);
      setSkills([]);
      setSkillInput('');
      setAntisesgo(true);
    } catch {
      // el error se maneja en el padre
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Título */}
      <InputField
        id="titulo"
        name="titulo"
        label="Título"
        placeholder="Ej: Analista de Datos Senior"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        error={errors.titulo}
        required
      />

      {/* Nivel y Área */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-label-large font-medium text-input-label mb-1">
            Nivel
          </label>
          <CustomSelect value={nivel} onChange={setNivel} options={NIVELES} />
        </div>
        <div>
          <label className="block text-label-large font-medium text-input-label mb-1">
            Área de especialización
          </label>
          <CustomSelect value={area} onChange={setArea} options={AREAS} />
        </div>
      </div>

      {/* Región (select nativo con IDs) */}
      <div>
        <label htmlFor="region" className="block text-label-large font-medium text-input-label mb-1">
          Región
        </label>
        <select
          id="region"
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          className="w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary outline-none focus:border-input-focus"
        >
          <option value="">Seleccionar región...</option>
          {regiones.map((reg) => (
            <option key={reg.id} value={reg.id}>
              {reg.nombre}
            </option>
          ))}
        </select>
        {errors.region && (
          <p className="text-badge-error-text text-body-small mt-1">{errors.region}</p>
        )}
      </div>

      {/* Skills (tags libres) */}
      <div>
        <label className="block text-label-large font-medium text-input-label mb-1">
          Habilidades requeridas
        </label>

        {/* Contenedor relativo para posicionar el botón dentro del input */}
        <div className="relative mb-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="Ej: Python"
            className="w-full rounded-lg border border-input-border bg-input-bg py-2 pl-3 pr-24 text-body-medium outline-none focus:border-input-focus"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md border border-button-secondary-border px-3 py-1.5 text-label-small font-semibold text-button-secondary-text transition-colors hover:border-brand-secondary hover:text-brand-secondary"
          >
            <Plus className="mr-1 inline-block h-3.5 w-3.5" />
            Agregar
          </button>
        </div>

        {errors.skills && <p className="text-badge-error-text text-body-small mb-2">{errors.skills}</p>}

        <div className="flex flex-wrap gap-2 min-h-10 p-2 rounded-lg border border-border-light bg-bg-tertiary">
          {skills.length > 0 ? (
            skills.map((sk) => (
              <span key={sk} className="inline-flex items-center gap-2 rounded-full bg-bg-primary px-3 py-1 text-label-small font-medium shadow-sm">
                {sk}
                <button type="button" onClick={() => handleRemoveSkill(sk)} className="text-text-secondary hover:text-badge-error-text">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))
          ) : (
            <p className="text-body-small text-text-secondary px-2">No hay habilidades agregadas</p>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-label-large font-medium text-input-label mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Detalles adicionales sobre la posición..."
          className="w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary outline-none focus:border-input-focus resize-none"
        />
      </div>

      {/* Diversidad Mínima */}
      <div>
        <label htmlFor="diversidadMinima" className="block text-label-large font-medium text-input-label mb-1">
          Diversidad Mínima %
        </label>
        <input
          id="diversidadMinima"
          name="diversidadMinima"
          type="number"
          min={0}
          max={100}
          value={diversidadMinima}
          onChange={(e) => setDiversidadMinima(Number(e.target.value) || 0)}
          className="w-24 rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary outline-none focus:border-input-focus"
        />
        {errors.diversidadMinima && (
          <p className="text-badge-error-text text-body-small mt-1">{errors.diversidadMinima}</p>
        )}
      </div>

      {/* Antisesgo */}
      <Toggle checked={antisesgo} onChange={setAntisesgo} label="Antisesgo" />

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-border-medium bg-white px-5 py-2 text-button-medium font-semibold text-text-primary transition-colors hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-brand-secondary px-5 py-2 text-button-medium font-semibold text-white transition-colors hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}