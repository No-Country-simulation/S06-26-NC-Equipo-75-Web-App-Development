import { useEffect, useState } from 'react';
import InputField from '../molecules/InputField';
import CustomSelect from '../molecules/CustomSelect';
import Toggle from '../atoms/Toggle';
import { X } from 'lucide-react';
import type { VacanteCreate } from '../../services/vacantes.service';
import { regionService, type Region } from '../../services/region.service';
import { skillsService } from '../../services/skills.service';

interface VacancyFormProps {
  onSubmit: (data: VacanteCreate) => Promise<void>;
  isSubmitting?: boolean;
  onClose: () => void;
  initialData?: Partial<{
    titulo: string;
    nivelRequerido: string;
    area: string;
    regionId: string;
    descripcion: string;
    diversidadMinima: number;
    skillIds: string[];
    pesosScore: { skills: number; nivel: number; experiencia: number };
  }>;
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
  initialData,
}: VacancyFormProps) {
  // Inicialización directa desde initialData (sin useEffect)
  const [titulo, setTitulo] = useState(initialData?.titulo ?? '');
  const [nivel, setNivel] = useState<string>(() => {
    if (initialData?.nivelRequerido) {
      const encontrado = Object.entries(NIVEL_MAP).find(
        ([, v]) => v === initialData.nivelRequerido
      );
      return encontrado ? encontrado[0] : 'Junior';
    }
    return 'Junior';
  });
  const [area, setArea] = useState(initialData?.area ?? 'Frontend');
  const [regionId, setRegionId] = useState(initialData?.regionId ?? '');
  const [descripcion, setDescripcion] = useState(initialData?.descripcion ?? '');
  const [diversidadMinima, setDiversidadMinima] = useState(initialData?.diversidadMinima ?? 30);
  const [pesoSkills, setPesoSkills] = useState(initialData?.pesosScore?.skills ?? 60);
  const [pesoNivel, setPesoNivel] = useState(initialData?.pesosScore?.nivel ?? 25);
  const [pesoExperiencia, setPesoExperiencia] = useState(initialData?.pesosScore?.experiencia ?? 15);
  const [selectedSkillIds, setSelectedSkillIds] = useState(initialData?.skillIds ?? []);

  const [antisesgo, setAntisesgo] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Regiones y skills desde API
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [allSkills, setAllSkills] = useState<{ id: string; nombre: string }[]>([]);

  useEffect(() => {
    regionService.getAll().then(setRegiones).catch(() => setRegiones([]));
    skillsService.getAll().then(setAllSkills).catch(() => setAllSkills([]));
  }, []);

  const toggleSkill = (id: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((sk) => sk !== id) : [...prev, id]
    );
  };

  const formularioValido =
    titulo.trim() !== '' &&
    selectedSkillIds.length > 0 &&
    regionId !== '' &&
    (pesoSkills + pesoNivel + pesoExperiencia) === 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    const newErrors: Record<string, string> = {};

    if (!titulo.trim()) newErrors.titulo = 'El título es obligatorio';
    if (selectedSkillIds.length === 0) newErrors.skills = 'Selecciona al menos una skill';
    if (!regionId) newErrors.region = 'La región es obligatoria';
    if (diversidadMinima < 0 || diversidadMinima > 100)
      newErrors.diversidadMinima = 'Valor entre 0 y 100';

    const sumaPesos = pesoSkills + pesoNivel + pesoExperiencia;
    if (sumaPesos !== 100)
      newErrors.pesosScore = `Los pesos deben sumar 100% (actual: ${sumaPesos}%)`;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const vacanteData: VacanteCreate = {
      titulo: titulo.trim(),
      nivelRequerido: NIVEL_MAP[nivel] || 'JUNIOR',
      area,
      regionId,
      descripcion: descripcion.trim() || '',
      diversidadMinima,
      skillIds: selectedSkillIds,
      pesosScore: {
        skills: pesoSkills,
        nivel: pesoNivel,
        experiencia: pesoExperiencia,
      },
    };

    try {
      await onSubmit(vacanteData);
      // Limpiar campos
      setTitulo('');
      setNivel('Junior');
      setArea('Frontend');
      setRegionId('');
      setDescripcion('');
      setDiversidadMinima(30);
      setPesoSkills(60);
      setPesoNivel(25);
      setPesoExperiencia(15);
      setSelectedSkillIds([]);
      setAntisesgo(true);

      setSuccessMessage(initialData ? '¡Vacante actualizada con éxito!' : '¡Vacante creada con éxito!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      setSuccessMessage('Error al guardar la vacante. Intente nuevamente.');
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
            Nivel <span className="text-badge-error-text ml-0.5">*</span>
          </label>
          <CustomSelect value={nivel} onChange={setNivel} options={NIVELES} />
        </div>
        <div>
          <label className="block text-label-large font-medium text-input-label mb-1">
            Área de especialización <span className="text-badge-error-text ml-0.5">*</span>
          </label>
          <CustomSelect value={area} onChange={setArea} options={AREAS} />
        </div>
      </div>

      {/* Región */}
      <div>
        <label htmlFor="region" className="block text-label-large font-medium text-input-label mb-1">
          Región <span className="text-badge-error-text ml-0.5">*</span>
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
        {errors.region && <p className="text-badge-error-text text-body-small mt-1">{errors.region}</p>}
      </div>

      {/* Skills (grilla con datos reales) */}
      <div>
        <label className="block text-label-large font-medium text-input-label mb-1">
          Habilidades requeridas <span className="text-badge-error-text ml-0.5">*</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2 min-h-10 p-2 rounded-lg border border-border-light bg-bg-tertiary">
          {selectedSkillIds.length > 0 ? (
            selectedSkillIds.map((id) => {
              const skill = allSkills.find((s) => s.id === id);
              return (
                <span key={id} className="inline-flex items-center gap-2 rounded-full bg-bg-primary px-3 py-1 text-label-small font-medium shadow-sm">
                  {skill?.nombre || id}
                  <button type="button" onClick={() => toggleSkill(id)} className="text-text-secondary hover:text-badge-error-text">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              );
            })
          ) : (
            <p className="text-body-small text-text-secondary px-2">No hay habilidades seleccionadas</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-2 bg-bg-tertiary">
          {allSkills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              onClick={() => toggleSkill(skill.id)}
              className={`text-left px-3 py-1.5 rounded-lg text-label-small font-medium transition-colors ${
                selectedSkillIds.includes(skill.id)
                  ? 'bg-brand-secondary text-white'
                  : 'bg-bg-primary text-text-secondary hover:bg-bg-secondary'
              }`}
            >
              {skill.nombre}
            </button>
          ))}
        </div>
        {errors.skills && <p className="text-badge-error-text text-body-small mt-1">{errors.skills}</p>}
      </div>

      {/* Pesos del score (HU-009) */}
      <div className="rounded-xl border border-border-light bg-bg-secondary p-4 space-y-3">
        <h3 className="text-label-large font-semibold text-text-primary">Configurar pesos del score</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-label-small font-medium text-input-label">Skills (%)</label>
            <input type="number" min={0} max={100} value={pesoSkills} onChange={(e) => setPesoSkills(Number(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary outline-none focus:border-input-focus" />
          </div>
          <div>
            <label className="text-label-small font-medium text-input-label">Nivel (%)</label>
            <input type="number" min={0} max={100} value={pesoNivel} onChange={(e) => setPesoNivel(Number(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary outline-none focus:border-input-focus" />
          </div>
          <div>
            <label className="text-label-small font-medium text-input-label">Experiencia (%)</label>
            <input type="number" min={0} max={100} value={pesoExperiencia} onChange={(e) => setPesoExperiencia(Number(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary outline-none focus:border-input-focus" />
          </div>
        </div>
        <p className="text-body-small text-text-secondary">Deben sumar 100%. Actual: {pesoSkills + pesoNivel + pesoExperiencia}%</p>
        {errors.pesosScore && <p className="text-badge-error-text text-body-small">{errors.pesosScore}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-label-large font-medium text-input-label mb-1">Descripción</label>
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
          Diversidad Mínima % <span className="text-badge-error-text ml-0.5">*</span>
        </label>
        <input
          id="diversidadMinima"
          type="number"
          min={0}
          max={100}
          value={diversidadMinima}
          onChange={(e) => setDiversidadMinima(Number(e.target.value) || 0)}
          className="w-24 rounded-lg border border-input-border bg-input-bg p-3 text-body-medium text-text-primary outline-none focus:border-input-focus"
        />
        {errors.diversidadMinima && <p className="text-badge-error-text text-body-small mt-1">{errors.diversidadMinima}</p>}
      </div>

      {/* Antisesgo */}
      <Toggle checked={antisesgo} onChange={setAntisesgo} label="Antisesgo" />

      {/* Mensaje de confirmación / error */}
      {successMessage && (
        <div className={`rounded-lg p-3 text-body-small font-medium ${
          successMessage.includes('éxito') || successMessage.includes('actualizada')
            ? 'bg-badge-success-bg text-badge-success-text'
            : 'bg-badge-error-bg text-badge-error-text'
        }`}>
          {successMessage}
        </div>
      )}

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
          disabled={isSubmitting || !formularioValido}
          className="rounded-full bg-brand-secondary px-5 py-2 text-button-medium font-semibold text-white transition-colors hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}