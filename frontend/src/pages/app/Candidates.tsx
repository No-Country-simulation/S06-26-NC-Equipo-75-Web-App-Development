import { useState, useEffect, useMemo } from 'react';
import { Users, Eye, Mail } from 'lucide-react';
import KpiCard from '../../components/molecules/KpiCard';
import DataTable, { type Column } from '../../components/organisms/DataTable';
import SearchBar from '../../components/molecules/SearchBar';
import Badge from '../../components/atoms/Badge';
import { candidatosService, type Candidato } from '../../services/candidatos.service';

// ─── Configuración de colores (puede ir en utils) ────
const NIVEL_COLORS: Record<string, string> = {
  Trainee:      'bg-badge-diversity-bg text-badge-diversity-text',
  Junior:       'bg-badge-esg-bg text-badge-esg-text',
  'Semi Senior':'bg-badge-warning-bg text-badge-warning-text',
  Senior:       'bg-badge-success-bg text-badge-success-text',
  Lead:         'bg-badge-error-bg text-badge-error-text',
};

const ESTADO_COLORS: Record<string, string> = {
  Contratado: 'bg-badge-success-bg text-badge-success-text',
  Entrevista: 'bg-badge-warning-bg text-badge-warning-text',
  Rechazado:  'bg-badge-error-bg text-badge-error-text',
  Contactado: 'bg-badge-esg-bg text-badge-esg-text',
  'Aplicó':   'bg-badge-diversity-bg text-badge-diversity-text',
};

export default function Candidates() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    candidatosService.getAll().then((data) => {
      setCandidatos(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return candidatos;
    return candidatos.filter((c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.habilidades.some((h) => h.toLowerCase().includes(search.toLowerCase())) ||
      c.region.toLowerCase().includes(search.toLowerCase())
    );
  }, [candidatos, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const total = candidatos.length;
  const shortlist = candidatos.filter((c) => c.score >= 80).length;
  const pctDiversidad = total > 0
    ? Math.round((candidatos.filter((c) => c.diversidad !== 'Sin badge').length / total) * 100)
    : 0;
  const scorePromedio = total > 0
    ? Math.round(candidatos.reduce((acc, c) => acc + c.score, 0) / total)
    : 0;

  const columns: Column<Candidato>[] = [
    { key: 'score', header: 'Score' },
    { key: 'nombre', header: 'Nombre' },
    {
      key: 'nivel',
      header: 'Nivel',
      render: (c) => <Badge label={c.nivel} className={NIVEL_COLORS[c.nivel] || ''} />,
    },
    {
      key: 'habilidades',
      header: 'Habilidades',
      render: (c) => (
        <span className="text-body-small text-text-secondary max-w-45 block">
          {c.habilidades.join(', ')}
        </span>
      ),
    },
    { key: 'diversidad', header: 'Diversidad' },
    { key: 'region', header: 'Región' },
    {
      key: 'estado',
      header: 'Estado',
      render: (c) => <Badge label={c.estado} className={ESTADO_COLORS[c.estado] || ''} />,
    },
    {
      key: 'acciones',
      header: '',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-brand-secondary" title="Ver perfil">
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-brand-secondary" title="Contactar">
            <Mail className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado y botón volver */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-h3 font-semibold leading-h3 text-text-primary">
            Vacante: Analista de Datos Senior · TechBrasil S.A.
          </h2>
          <p className="mt-1 text-body-small text-text-secondary">
            Ejecutado el 25/08/2026 · 14:30 · {total} candidatos
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-border-medium bg-bg-primary px-4 py-2 text-label-large font-semibold text-text-primary transition-colors hover:border-brand-secondary hover:text-brand-secondary shrink-0">
          <Eye className="h-4 w-4" /> {/* ArrowLeft si lo preferís */}
          Volver a Vacantes
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Total Analizados" value={total.toLocaleString()} icon={Users} valueClassName="text-text-primary" />
        <KpiCard label="Shortlist Generado" value={shortlist} icon={Users} valueClassName="text-text-primary" />
        <KpiCard label="% Diversidad" value={`${pctDiversidad}%`} icon={Users} valueClassName="text-text-primary" />
        <KpiCard label="Score Promedio" value={`${scorePromedio}%`} icon={Users} valueClassName="text-text-primary" />
      </div>

      {/* Buscador */}
      <SearchBar
        value={search}
        onChange={(val) => { setSearch(val); setCurrentPage(1); }}
        placeholder="Buscar por nombre, habilidades o región..."
        className="sm:w-80"
      />

      {/* Tabla */}
      <DataTable
        data={filtered}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}