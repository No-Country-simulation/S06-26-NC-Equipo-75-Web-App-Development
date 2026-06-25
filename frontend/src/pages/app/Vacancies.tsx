import React, { useState, useEffect, useCallback } from 'react';
import KpiCard from '../../components/molecules/KpiCard';
import DataTable, { type Column } from '../../components/organisms/DataTable';
import { useAuth } from '../../contexts/useAuth';
import { vacantesService, type Vacante } from '../../services/vacantes.service';
import {
  Briefcase,
  CheckCircle,
  PauseCircle,
  XCircle,
} from 'lucide-react';

const Vacancies: React.FC = () => {
  const { user } = useAuth();
  const companyId = user?.companyId || 'temp-company-id';

  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState<'Todos' | 'Abierto' | 'Pausado' | 'Cerrado'>('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await vacantesService.getByCompany(companyId);
        if (!cancelled) setVacantes(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar vacantes');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [companyId, refreshKey]);

  const triggerRefresh = useCallback(() => setRefreshKey(prev => prev + 1), []);

  const filteredVacantes = vacantes.filter(vac => {
    const matchesSearch = vac.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = estadoFilter === 'Todos' || vac.estado === estadoFilter;
    return matchesSearch && matchesEstado;
  });

  const totalPages = Math.ceil(filteredVacantes.length / itemsPerPage);

  const total = vacantes.length;
  const abiertas = vacantes.filter(v => v.estado === 'Abierto').length;
  const pausadas = vacantes.filter(v => v.estado === 'Pausado').length;
  const cerradas = vacantes.filter(v => v.estado === 'Cerrado').length;

  const handleView = (vac: Vacante) => console.log('Ver', vac);
  const handleEdit = (vac: Vacante) => console.log('Editar', vac);
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

  const getEstadoColor = (estado: Vacante['estado']) => {
    switch (estado) {
      case 'Abierto': return 'text-badge-success-text bg-badge-success-bg';
      case 'Pausado': return 'text-badge-warning-text bg-badge-warning-bg';
      case 'Cerrado': return 'text-badge-error-text bg-badge-error-bg';
      default: return 'text-text-secondary bg-bg-tertiary';
    }
  };

  const columns: Column<Vacante>[] = [
    { key: 'titulo', header: 'Título' },
    { key: 'nivel', header: 'Nivel', hideOnMobile: true },
    { key: 'region', header: 'Región', hideOnMobile: true },
    {
      key: 'estado',
      header: 'Estado',
      render: (vac) => (
        <span className={`px-3 py-1 rounded-full text-badge font-bold ${getEstadoColor(vac.estado)}`}>
          {vac.estado}
        </span>
      ),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (vac) => (
        <div className="flex items-center justify-end gap-3">
          <button className="text-text-tertiary hover:text-brand-secondary transition-colors" title="Ver detalles" onClick={() => handleView(vac)}>
            <i className="fas fa-eye" />
          </button>
          <button className="text-text-tertiary hover:text-brand-secondary transition-colors" title="Editar" onClick={() => handleEdit(vac)}>
            <i className="fas fa-pen" />
          </button>
          <button className="text-text-tertiary hover:text-badge-error-text transition-colors" title="Eliminar" onClick={() => handleDelete(vac)}>
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      ),
    },
  ];

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

  return (
    <>
      {/* Botón Crear Vacante */}
      <div className="flex justify-end mb-6">
        <button className="px-5 py-2.5 bg-button-primary text-button-primary-text rounded-lg font-semibold text-button-medium hover:bg-button-primary-hover transition-colors flex items-center gap-2 shrink-0">
          <i className="fas fa-plus" />
          Crear Vacante
        </button>
      </div>

      {/* KpiCards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Vacantes totales" value={total} icon={Briefcase} valueClassName="text-text-primary" />
        <KpiCard label="Abiertas" value={abiertas} icon={CheckCircle} valueClassName="text-badge-success-text" />
        <KpiCard label="Pausadas" value={pausadas} icon={PauseCircle} valueClassName="text-badge-warning-text" />
        <KpiCard label="Cerradas" value={cerradas} icon={XCircle} valueClassName="text-badge-error-text" />
      </div>

      {/* Buscador y filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="relative w-full sm:w-72">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="Buscar vacantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-primary border border-input-border rounded-lg text-body-medium text-text-primary placeholder:text-input-placeholder focus:border-input-focus outline-none transition-colors"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(['Todos', 'Abierto', 'Pausado', 'Cerrado'] as const).map((estado) => (
            <button
              key={estado}
              onClick={() => setEstadoFilter(estado)}
              className={`px-4 py-1.5 rounded-full text-badge font-bold transition-colors ${
                estadoFilter === estado ? 'bg-brand-secondary text-white' : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <DataTable
        data={filteredVacantes}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Vacancies;