import { useEffect, useState } from 'react';
import InputField from '../molecules/InputField';
import CustomSelect from '../molecules/CustomSelect';
import SkillsTagsInput from '../molecules/SkillsTagsInput';
import Toggle from '../atoms/Toggle';
import type { VacanteCreate } from '../../services/vacantes.service';
import { regionService, type Region } from '../../services/region.service';

interface VacancyFormProps {
  onSubmit: (data: VacanteCreate) => Promise<void>;
  isSubmitting?: boolean;
  onClose: () => void;
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
  const [regionId, setRegionId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [diversidadMinima, setDiversidadMinima] = useState<number>(30);
  const [skills, setSkills] = useState<string[]>([]);
  const [antisesgo, setAntisesgo] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [regiones, setRegiones] = useState<Region[]>([]);

  useEffect(() => {
    regionService.getAll().then(setRegiones).catch(() => setRegiones([]));
  }, []);

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
      skillIds: skills,
    };

    try {
      await onSubmit(vacanteData);
      setTitulo('');
      setNivel('Junior');
      setArea('Frontend');
      setRegionId('');
      setDescripcion('');
      setDiversidadMinima(30);
      setSkills([]);
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

      {/* Región */}
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

      {/* Skills */}
      <SkillsTagsInput
        skills={skills}
        onChange={setSkills}
        error={errors.skills}
      />

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