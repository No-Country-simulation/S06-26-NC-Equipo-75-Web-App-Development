import { useMemo } from 'react';
import KpiCard from '../../components/molecules/KpiCard';
import Badge from '../../components/atoms/Badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  Briefcase,
} from 'lucide-react';

// ─── Mock data ────────────────────────────────────────
const META_DIVERSIDAD = 40;

const kpiData = {
  contratacionesDiversas: 42,
  shortlistDiversidad: 38,
  candidatosContactados: 25,
  tasaConversion: 18,
};

const datosPorEtapa = [
  { etapa: 'Shortlist', conBadge: 38, sinBadge: 62 },
  { etapa: 'Contactados', conBadge: 25, sinBadge: 75 },
  { etapa: 'Entrevistas', conBadge: 20, sinBadge: 80 },
  { etapa: 'Contratados', conBadge: 18, sinBadge: 82 },
];

const evolucionTemporal = [
  { mes: 'Ene', diversidad: 30 },
  { mes: 'Feb', diversidad: 32 },
  { mes: 'Mar', diversidad: 35 },
  { mes: 'Abr', diversidad: 38 },
  { mes: 'May', diversidad: 40 },
  { mes: 'Jun', diversidad: 42 },
];

const embudoData = [
  { etapa: 'Base', valor: 100 },
  { etapa: 'Shortlist', valor: 38 },
  { etapa: 'Contactados', valor: 25 },
  { etapa: 'Entrevistas', valor: 20 },
  { etapa: 'Contratados', valor: 18 },
];

// ─── Helpers ──────────────────────────────────────────
function getKpiStatus(actual: number, meta: number) {
  if (actual >= meta) return 'text-badge-success-text';
  if (actual >= meta * 0.75) return 'text-badge-warning-text';
  return 'text-badge-error-text';
}

// ─── Componente ───────────────────────────────────────
export default function Dashboard() {
  const cumpleMeta = kpiData.contratacionesDiversas >= META_DIVERSIDAD;

  const alertaActiva = useMemo(() => {
    return (
      kpiData.contratacionesDiversas < META_DIVERSIDAD ||
      kpiData.shortlistDiversidad < 30 ||
      kpiData.tasaConversion < 15
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Alerta visual */}
      {alertaActiva && (
        <div className="flex items-center gap-3 rounded-xl border border-badge-warning-bg bg-badge-warning-bg p-4">
          <AlertTriangle className="h-5 w-5 text-badge-warning-text" />
          <span className="text-body-medium font-medium text-badge-warning-text">
            Atención: algunas métricas están por debajo de las metas establecidas.
          </span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="Contrataciones diversas"
          value={`${kpiData.contratacionesDiversas}%`}
          icon={Users}
          valueClassName={getKpiStatus(kpiData.contratacionesDiversas, META_DIVERSIDAD)}
        />
        <KpiCard
          label="Diversidad en shortlist"
          value={`${kpiData.shortlistDiversidad}%`}
          icon={Briefcase}
          valueClassName="text-text-primary"
        />
        <KpiCard
          label="Candidatos contactados"
          value={`${kpiData.candidatosContactados}%`}
          icon={Target}
          valueClassName="text-text-primary"
        />
        <KpiCard
          label="Tasa de conversión"
          value={`${kpiData.tasaConversion}%`}
          icon={TrendingUp}
          valueClassName="text-text-primary"
        />
      </div>

      {/* Gráfico de barras: comparación por etapa */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm">
        <h2 className="text-h3 font-semibold text-text-primary mb-4">
          Diversidad por etapa del proceso
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={datosPorEtapa}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="etapa" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="conBadge" fill="var(--color-brand-secondary)" name="Con badge" />
            <Bar dataKey="sinBadge" fill="var(--color-gray-300)" name="Sin badge" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de línea: evolución temporal */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm">
        <h2 className="text-h3 font-semibold text-text-primary mb-4">
          Evolución del % de diversidad
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={evolucionTemporal}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="diversidad"
              stroke="var(--color-brand-secondary)"
              strokeWidth={2}
              name="% Diversidad"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Embudo de conversión */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm">
        <h2 className="text-h3 font-semibold text-text-primary mb-4">
          Embudo de conversión — Candidatos con badge
        </h2>
        <div className="space-y-2">
          {embudoData.map((item) => (
            <div key={item.etapa} className="flex items-center gap-3">
              <span className="w-24 text-body-small text-text-secondary">{item.etapa}</span>
              <div className="flex-1 h-8 bg-bg-tertiary rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-secondary rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${item.valor}%` }}
                >
                  <span className="text-label-small font-medium text-white">
                    {item.valor}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador de meta */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-body-medium font-medium text-text-primary">
            Meta de diversidad: {META_DIVERSIDAD}%
          </span>
          <Badge
            label={cumpleMeta ? 'Cumplida' : 'No cumplida'}
            className={
              cumpleMeta
                ? 'bg-badge-success-bg text-badge-success-text'
                : 'bg-badge-error-bg text-badge-error-text'
            }
          />
        </div>
        <div className="mt-2 h-2 bg-bg-tertiary rounded-full">
          <div
            className={`h-full rounded-full ${
              cumpleMeta ? 'bg-badge-success-text' : 'bg-badge-error-text'
            }`}
            style={{ width: `${kpiData.contratacionesDiversas}%` }}
          />
        </div>
      </div>
    </div>
  );
}