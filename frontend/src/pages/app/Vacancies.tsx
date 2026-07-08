
import React, { useState, useEffect, useCallback } from 'react';
import KpiCard from '../../components/molecules/KpiCard';
import DataTable, { type Column } from '../../components/organisms/DataTable';
import SearchBar from '../../components/molecules/SearchBar';
import FilterTabs from '../../components/molecules/FilterTabs';
import Button from '../../components/atoms/Button';
import Modal from '../../components/molecules/Modal';
import VacancyForm from '../../components/organisms/VacancyForm';
import { useAuth } from '../../contexts/useAuth';
import { vacantesService, type Vacante, type VacanteCreate } from '../../services/vacantes.service';
import {
  Briefcase,
  CheckCircle,
  PauseCircle,
  XCircle,
  Plus,
  Eye,
  Edit,
  Pause,
  Play,
  StopCircle,
  Users,
} from 'lucide-react';

const ESTADOS_FILTRO = ['Todos', 'Abierto', 'Pausado', 'Cerrado'] as const;

const ESTADO_MAP: Record<string, string> = {
  OPEN: 'Abierto',
  CLOSED: 'Cerrado',
  PAUSED: 'Pausado',
};

// Mapeo inverso para enviar al backend
const ESTADO_REVERSE_MAP: Record<string, string> = {
  'Abierto': 'OPEN',
  'Cerrado': 'CLOSED',
  'Pausado': 'PAUSED',
};

const Vacancies: React.FC = () => {
  const { user } = useAuth();
  const companyId = user?.companyId || 'temp-company-id';

  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState<string>('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal de creación
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Modal de edición
  const [editingVacante, setEditingVacante] = useState<Vacante | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // ---------- Efecto de carga ----------
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await vacantesService.getByCompany(companyId);
        if (!cancelled) setVacantes(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Error al cargar vacantes');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [companyId, refreshKey]);

  const triggerRefresh = useCallback(() => setRefreshKey((prev) => prev + 1), []);

  // ---------- Filtrado ----------
  const filteredVacantes = vacantes.filter((vac) => {
    const matchesSearch = vac.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = estadoFilter === 'Todos' || ESTADO_MAP[vac.estado] === estadoFilter;
    return matchesSearch && matchesEstado;
  });

  const totalPages = Math.ceil(filteredVacantes.length / itemsPerPage);

  // ---------- Métricas ----------
  const total = vacantes.length;
  const abiertas = vacantes.filter((v) => v.estado === 'Abierto').length;
  const pausadas = vacantes.filter((v) => v.estado === 'Pausado').length;
  const cerradas = vacantes.filter((v) => v.estado === 'Cerrado').length;

  // ---------- Acciones ----------
  const handleView = (vac: Vacante) => console.log('Ver', vac);

  const handleDelete = async (vac: Vacante) => {
    if (!confirm('¿Eliminar esta vacante?')) return;
    try {
      await vacantesService.delete(vac.id);
      triggerRefresh();
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('No se pudo eliminar la vacante.');
    }
  };

  // Cambio de estado (pausar / reanudar / cerrar)
  const handleChangeStatus = async (vac: Vacante, nuevoEstado: string) => {
    const accion = nuevoEstado === 'Abierto' ? 'reanudar' : nuevoEstado === 'Pausado' ? 'pausar' : 'cerrar';
    if (!confirm(`¿${accion.charAt(0).toUpperCase() + accion.slice(1)} esta vacante?`)) return;
    try {
      await vacantesService.updateStatus(vac.id, ESTADO_REVERSE_MAP[nuevoEstado] as 'Abierto' | 'Pausado' | 'Cerrado');
      triggerRefresh();
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      alert('No se pudo cambiar el estado de la vacante.');
    }
  };

  // Crear vacante
  const handleCreateVacante = async (data: VacanteCreate) => {
    setIsCreating(true);
    try {
      await vacantesService.create(data);
      triggerRefresh();
    } finally {
      setIsCreating(false);
    }
  };

  // Editar vacante
  const handleEditVacante = async (data: VacanteCreate) => {
    if (!editingVacante) return;
    setIsEditing(true);
    try {
      await vacantesService.update(editingVacante.id, data);
      setEditingVacante(null);
      triggerRefresh();
    } catch (err) {
      console.error('Error al editar:', err);
      alert('No se pudo editar la vacante.');
    } finally {
      setIsEditing(false);
    }
  };

  const getEstadoColor = (estado: string) => {
    const estadoNormalizado = ESTADO_MAP[estado] || estado;
    switch (estadoNormalizado) {
      case 'Abierto': return 'text-badge-success-text bg-badge-success-bg';
      case 'Pausado': return 'text-badge-warning-text bg-badge-warning-bg';
      case 'Cerrado': return 'text-badge-error-text bg-badge-error-bg';
      default: return 'text-text-secondary bg-bg-tertiary';
    }
  };

  // ---------- Columnas de la tabla ----------
  const columns: Column<Vacante>[] = [
    { key: 'titulo', header: 'Título' },
    {
      key: 'nivel',
      header: 'Nivel',
      hideOnMobile: true,
      render: (vac) => <span>{vac.nivelRequerido || '—'}</span>,
    },
    {
      key: 'region',
      header: 'Región',
      hideOnMobile: true,
      render: (vac) => <span>{vac.region?.nombre || '—'}</span>,
    },
    {
      key: 'contactados',
      header: 'Contactados',
      render: () => (
        <div className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5 text-text-tertiary" />
          <span className="text-body-small text-text-secondary">—</span>
        </div>
      ),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (vac) => (
        <span className={`px-3 py-1 rounded-full text-badge font-bold ${getEstadoColor(vac.estado)}`}>
          {ESTADO_MAP[vac.estado] || vac.estado}
        </span>
      ),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (vac) => {
        const estadoActual = ESTADO_MAP[vac.estado] || vac.estado;
        return (
          <div className="flex items-center justify-end gap-2">
            <button
              className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-brand-secondary"
              title="Ver detalles"
              onClick={() => handleView(vac)}
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-brand-secondary"
              title="Editar"
              onClick={() => setEditingVacante(vac)}
            >
              <Edit className="h-4 w-4" />
            </button>
            {estadoActual === 'Abierto' && (
              <button
                className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-badge-warning-text"
                title="Pausar"
                onClick={() => handleChangeStatus(vac, 'Pausado')}
              >
                <Pause className="h-4 w-4" />
              </button>
            )}
            {estadoActual === 'Pausado' && (
              <button
                className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-badge-success-text"
                title="Reanudar"
                onClick={() => handleChangeStatus(vac, 'Abierto')}
              >
                <Play className="h-4 w-4" />
              </button>
            )}
            {estadoActual !== 'Cerrado' && (
              <button
                className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-badge-error-text"
                title="Cerrar"
                onClick={() => handleChangeStatus(vac, 'Cerrado')}
              >
                <StopCircle className="h-4 w-4" />
              </button>
            )}
            <button
              className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-badge-error-text"
              title="Eliminar"
              onClick={() => handleDelete(vac)}
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];

  // ---------- Estados de carga / error ----------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-badge-error-text text-h3 font-semibold mb-2">Error</p>
          <p className="text-body-medium text-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  // ---------- Renderizado principal ----------
  return (
    <>
      {/* ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-h2 leading-h2 text-text-secondary max-w-2xl">
          Encuentra talento compatible y gestiona cada vacante desde un solo lugar.
        </h2>
        <Button variant="primary" size="medium" className="shrink-0" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-5 w-5" />
          Crear Vacante
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Vacantes totales" value={total} icon={Briefcase} valueClassName="text-text-primary" />
        <KpiCard label="Abiertas" value={abiertas} icon={CheckCircle} valueClassName="text-badge-success-text" />
        <KpiCard label="Pausadas" value={pausadas} icon={PauseCircle} valueClassName="text-badge-warning-text" />
        <KpiCard label="Cerradas" value={cerradas} icon={XCircle} valueClassName="text-badge-error-text" />
      </div>

      {/* BUSCADOR Y FILTROS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-16 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar vacantes..." className="sm:w-145" />
        <FilterTabs options={ESTADOS_FILTRO} selected={estadoFilter} onChange={setEstadoFilter} />
      </div>

      {/* TABLA */}
      <DataTable data={filteredVacantes} columns={columns} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* MODAL DE CREAR VACANTE */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Crear Vacante" maxWidth="md">
        <VacancyForm onSubmit={handleCreateVacante} isSubmitting={isCreating} onClose={() => setIsCreateModalOpen(false)} />
      </Modal>

      {/* MODAL DE EDITAR VACANTE */}
      <Modal isOpen={!!editingVacante} onClose={() => setEditingVacante(null)} title="Editar Vacante" maxWidth="md">
        {editingVacante && (
          <VacancyForm
            onSubmit={handleEditVacante}
            isSubmitting={isEditing}
            onClose={() => setEditingVacante(null)}
            initialData={{
              titulo: editingVacante.titulo,
              nivelRequerido: editingVacante.nivelRequerido,
              area: editingVacante.area,
              regionId: editingVacante.region?.id || '',
              descripcion: editingVacante.descripcion || '',
              diversidadMinima: editingVacante.diversidadMinima || 30,
              skillIds: editingVacante.skills?.map((s) => s.skillId) || [],
              pesosScore: { skills: 60, nivel: 25, experiencia: 15 },
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default Vacancies;