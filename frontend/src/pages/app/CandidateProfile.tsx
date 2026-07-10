import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { candidatosService, type Candidato } from '../../services/candidatos.service';
import CustomSelect from '../../components/molecules/CustomSelect';
import SkillsTagsInput from '../../components/molecules/SkillsTagsInput';
import InputField from '../../components/molecules/InputField';
import Badge from '../../components/atoms/Badge';
import Toggle from '../../components/atoms/Toggle';

const NIVELES = ['Trainee', 'Junior', 'Semi Senior', 'Senior', 'Lead'] as const;
const AREAS = [
  'Frontend', 'Backend', 'Full Stack', 'Data Science', 'Machine Learning',
  'DevOps', 'QA', 'Product Management', 'UX/UI', 'Ciberseguridad', 'Otro',
] as const;

export default function CandidateProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [estadoLocal, setEstadoLocal] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    candidatosService
      .getById(id)
      .then(setCandidato)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center pt-10">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );

  if (error || !candidato)
    return <div className="text-center pt-10 text-text-secondary">Candidato no encontrado.</div>;

  const estadoActual = estadoLocal || candidato.estado;

  return (
    <div className="space-y-6">
      {/* Botón volver */}
      <button
        onClick={() => navigate('/candidatos')}
        className="flex items-center gap-2 text-body-medium text-text-secondary hover:text-brand-secondary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a Candidatos
      </button>

      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-h2 font-semibold text-text-primary">{candidato.nombre}</h1>
            <p className="text-body-medium text-text-secondary">Score: {candidato.score}%</p>
          </div>
        </div>
        <Badge label={estadoActual} className="bg-badge-esg-bg text-badge-esg-text" />
      </div>

      {/* Desglose del score */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm">
        <h2 className="text-h3 font-semibold text-text-primary mb-4">Desglose del Score</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-bg-secondary p-4 text-center">
            <p className="text-metric-label text-text-secondary">Skills</p>
            <p className="text-metric-large font-bold text-text-primary mt-1">
              {candidato.skillsScore ? `${(candidato.skillsScore * 100).toFixed(0)}%` : '—'}
            </p>
          </div>
          <div className="rounded-lg bg-bg-secondary p-4 text-center">
            <p className="text-metric-label text-text-secondary">Experiencia</p>
            <p className="text-metric-large font-bold text-text-primary mt-1">
              {candidato.experienciaScore ? `${(candidato.experienciaScore * 100).toFixed(0)}%` : '—'}
            </p>
          </div>
          <div className="rounded-lg bg-bg-secondary p-4 text-center">
            <p className="text-metric-label text-text-secondary">Región</p>
            <p className="text-metric-large font-bold text-text-primary mt-1">
              {candidato.regionScore ? `${(candidato.regionScore * 100).toFixed(0)}%` : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Información general */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm space-y-4">
          <h2 className="text-h3 font-semibold text-text-primary">Información general</h2>
          <CustomSelect value={candidato.nivel} onChange={() => {}} options={[...NIVELES]} />
          <CustomSelect
            value={candidato.area || 'No especificada'}
            onChange={() => {}}
            options={[...AREAS]}
          />
          <InputField
            id="region"
            name="region"
            label="Región"
            value={candidato.region}
            onChange={() => {}}
          />
        </div>

        <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm space-y-4">
          <h2 className="text-h3 font-semibold text-text-primary">Habilidades</h2>
          <SkillsTagsInput skills={candidato.habilidades} onChange={() => {}} />
        </div>
      </div>

      {/* Experiencia laboral (mock) */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm space-y-4">
        <h2 className="text-h3 font-semibold text-text-primary">Experiencia laboral</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField id="empresa" name="empresa" label="Empresa anterior" value="TechBrasil S.A." onChange={() => {}} />
          <InputField id="rol" name="rol" label="Rol" value="Frontend Developer" onChange={() => {}} />
          <InputField id="anos" name="anos" label="Años" value="3" onChange={() => {}} />
        </div>
      </div>

      {/* Diversidad e Inclusión */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm space-y-4">
        <h2 className="text-h3 font-semibold text-text-primary">Diversidad e Inclusión</h2>
        <div className="space-y-3">
          {[
            'Mujer en área tecnológica o STEM',
            'Resido en región periférica o de baja representación laboral',
            'Pertenezco a grupo étnico históricamente excluido',
            'Tengo discapacidad certificada o auto-declarada',
            'Soy el primero de mi familia en acceder a educación superior',
          ].map((badgeLabel) => (
            <label key={badgeLabel} className="flex items-start gap-3 cursor-default">
              <input
                type="checkbox"
                checked={candidato.badges.includes(badgeLabel)}
                readOnly
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-secondary focus:ring-brand-secondary cursor-default"
              />
              <span className="text-body-medium text-text-primary">{badgeLabel}</span>
            </label>
          ))}
        </div>
        <p className="text-body-small text-text-tertiary italic">
          Esta información es voluntaria. Solo se muestra como etiqueta en procesos de selección con metas de inclusión. No afecta tu puntuación de compatibilidad.
        </p>
      </div>

      {/* Consentimiento de ubicación */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm space-y-4">
        <h2 className="text-h3 font-semibold text-text-primary">Privacidad de ubicación</h2>
        <Toggle
          checked={candidato.consentimientoUbicacion}
          onChange={() => {}}
          label="Permitir que las empresas vean mi ubicación aproximada en el mapa de talento. Tu dirección exacta nunca se comparte."
        />
        <p className="text-body-small text-text-tertiary italic">
          Estado actual: {candidato.consentimientoUbicacion ? 'Activado' : 'Desactivado'}
        </p>
      </div>

      {/* Iniciar Contacto */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (estadoActual === 'Contactado') {
              alert('Este candidato ya fue contactado.');
              return;
            }
            setEstadoLocal('Contactado');
          }}
          disabled={estadoActual === 'Contactado'}
          className={`rounded-full px-5 py-2 text-button-medium font-semibold transition-colors ${
            estadoActual === 'Contactado'
              ? 'bg-bg-tertiary text-text-secondary cursor-not-allowed'
              : 'bg-brand-secondary text-white hover:bg-teal-600'
          }`}
        >
          {estadoActual === 'Contactado' ? 'Contactado ✓' : 'Iniciar Contacto'}
        </button>
      </div>

      {/* Indicador de completitud */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-body-medium font-medium text-text-primary">Perfil completado</span>
          <span className="text-metric-large font-bold text-brand-secondary">80%</span>
        </div>
        <div className="mt-2 h-2 bg-bg-tertiary rounded-full">
          <div className="h-full bg-brand-secondary rounded-full" style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );
}