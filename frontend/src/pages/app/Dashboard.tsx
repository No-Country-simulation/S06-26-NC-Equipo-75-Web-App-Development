import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

// Importación de componentes atómicos (si existen)
import Spinner from '../../components/atoms/Spinner';

// Datos mockeados para el dashboard
const mockDashboardData = {
  totalVacantes: 12,
  vacantesActivas: 5,
  totalCandidatos: 184,
  entrevistasPendientes: 8,
  tasaConversion: 5.1,
  diversidadShortlist: 38,
  diversidadContactados: 32,
  diversidadContratados: 42,
  metaDiversidad: 40,
  actividadesRecientes: [
    { id: 1, tipo: 'contacto', candidato: 'Ana García', vacante: 'Senior Frontend Engineer', fecha: 'Hace 2 horas', diverso: true },
    { id: 2, tipo: 'entrevista', candidato: 'Carlos Pérez', vacante: 'Product Designer', fecha: 'Hace 5 horas', diverso: false },
    { id: 3, tipo: 'contratacion', candidato: 'Lucía Fernández', vacante: 'Talent Acquisition Lead', fecha: 'Ayer', diverso: true },
    { id: 4, tipo: 'matching', candidato: 'Diego Morales', vacante: 'Data Analyst', fecha: 'Ayer', diverso: true },
    { id: 5, tipo: 'contacto', candidato: 'Sara Lindqvist', vacante: 'Customer Success Manager', fecha: 'Hace 2 días', diverso: false },
  ],
  evolucionDiversidad: [
    { mes: 'Ene', valor: 28 },
    { mes: 'Feb', valor: 30 },
    { mes: 'Mar', valor: 33 },
    { mes: 'Abr', valor: 35 },
    { mes: 'May', valor: 38 },
    { mes: 'Jun', valor: 42 },
  ],
  distribucionEtapas: [
    { etapa: 'Shortlist', total: 100, diversos: 38 },
    { etapa: 'Contactados', total: 62, diversos: 20 },
    { etapa: 'Entrevista', total: 34, diversos: 12 },
    { etapa: 'Contratados', total: 12, diversos: 5 },
  ],
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-secondary">
        <Spinner size="large" color="primary" />
      </div>
    );
  }

  const data = mockDashboardData;
  const cumpleMeta = data.diversidadContratados >= data.metaDiversidad;

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header con saludo y acciones rápidas */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-h1 text-text-primary">
            Buenas, {user?.name || 'Administrador'}
          </h1>
          <p className="text-body-medium text-text-secondary">
            Este es tu resumen de diversidad y reclutamiento
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/vacantes/nueva"
            className="px-5 py-2.5 bg-button-primary text-button-primary-text rounded-lg font-semibold text-button-medium hover:bg-button-primary-hover transition-colors"
          >
            <i className="fas fa-plus mr-2" />
            Nueva Vacante
          </Link>
          <Link
            to="/candidatos"
            className="px-5 py-2.5 border border-button-secondary-border bg-button-secondary text-button-secondary-text rounded-lg font-semibold text-button-medium hover:bg-button-secondary-hover transition-colors"
          >
            <i className="fas fa-search mr-2" />
            Buscar Talentos
          </Link>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-bg-primary border border-border-light rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label-small text-text-secondary">Vacantes activas</p>
              <p className="text-metric-large text-text-primary mt-1">{data.vacantesActivas}</p>
            </div>
            <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
              <i className="fas fa-briefcase text-xl" />
            </div>
          </div>
          <p className="text-label-small text-text-tertiary mt-2">
            {data.totalVacantes} totales publicadas
          </p>
        </div>

        <div className="bg-bg-primary border border-border-light rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label-small text-text-secondary">Candidatos en base</p>
              <p className="text-metric-large text-text-primary mt-1">{data.totalCandidatos}</p>
            </div>
            <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center text-brand-secondary">
              <i className="fas fa-users text-xl" />
            </div>
          </div>
          <p className="text-label-small text-text-tertiary mt-2">
            +12 esta semana
          </p>
        </div>

        <div className="bg-bg-primary border border-border-light rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label-small text-text-secondary">Entrevistas pendientes</p>
              <p className="text-metric-large text-text-primary mt-1">{data.entrevistasPendientes}</p>
            </div>
            <div className="w-12 h-12 bg-brand-tertiary/10 rounded-full flex items-center justify-center text-brand-tertiary">
              <i className="fas fa-calendar-check text-xl" />
            </div>
          </div>
          <p className="text-label-small text-text-tertiary mt-2">
            <span className="text-badge-success-text">↑ 2</span> que ayer
          </p>
        </div>

        <div className="bg-bg-primary border border-border-light rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-label-small text-text-secondary">Tasa de conversión</p>
              <p className="text-metric-large text-text-primary mt-1">{data.tasaConversion}%</p>
            </div>
            <div className="w-12 h-12 bg-badge-esg-bg/10 rounded-full flex items-center justify-center text-badge-esg-text">
              <i className="fas fa-chart-line text-xl" />
            </div>
          </div>
          <p className="text-label-small text-text-tertiary mt-2">
            aplicación → contratación
          </p>
        </div>
      </div>

      {/* Evolución de diversidad + meta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de evolución (mock) */}
        <div className="lg:col-span-2 bg-bg-primary border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h4 text-text-primary">Evolución de diversidad</h3>
            <span className="text-label-small text-text-secondary">Últimos 6 meses</span>
          </div>
          <div className="h-48 flex items-end gap-3">
            {data.evolucionDiversidad.map((item, idx) => {
              const height = (item.valor / 50) * 100;
              const isLast = idx === data.evolucionDiversidad.length - 1;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: `${Math.max(height, 10)}%`,
                      backgroundColor: isLast ? '#14B8A6' : '#1E6F73',
                      minHeight: '8px',
                    }}
                  />
                  <span className="text-label-small text-text-tertiary">{item.mes}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-label-small text-text-secondary">
            <span>Meta: {data.metaDiversidad}%</span>
            <span>Actual: {data.diversidadContratados}%</span>
          </div>
        </div>

        {/* Tarjeta de meta ESG */}
        <div className="bg-bg-primary border border-border-light rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-h4 text-text-primary">Meta ESG</h3>
            <p className="text-body-small text-text-secondary mt-1">
              Objetivo de diversidad en contrataciones
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-display-small text-text-primary font-bold">
                {data.diversidadContratados}%
              </span>
              <span className="text-body-medium text-text-secondary">
                / {data.metaDiversidad}%
              </span>
            </div>
            <div className="w-full h-3 bg-bg-tertiary rounded-full mt-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((data.diversidadContratados / data.metaDiversidad) * 100, 100)}%`,
                  backgroundColor: cumpleMeta ? '#14B8A6' : '#F59E0B',
                }}
              />
            </div>
            <p className="mt-3 text-label-small">
              {cumpleMeta ? (
                <span className="text-badge-success-text">
                  <i className="fas fa-check-circle mr-1" />
                  Meta cumplida
                </span>
              ) : (
                <span className="text-badge-warning-text">
                  <i className="fas fa-exclamation-triangle mr-1" />
                  Faltan {data.metaDiversidad - data.diversidadContratados} puntos
                </span>
              )}
            </p>
          </div>
          <Link
            to="/configuracion/metas"
            className="mt-4 text-label-medium text-brand-secondary hover:underline"
          >
            Configurar metas →
          </Link>
        </div>
      </div>

      {/* Embudo de contratación + Actividad reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Embudo de contratación */}
        <div className="lg:col-span-2 bg-bg-primary border border-border-light rounded-xl p-6 shadow-sm">
          <h3 className="text-h4 text-text-primary mb-4">Embudo de contratación</h3>
          <div className="space-y-4">
            {data.distribucionEtapas.map((etapa) => {
              const porcentajeDiverso = etapa.total > 0 ? (etapa.diversos / etapa.total) * 100 : 0;
              return (
                <div key={etapa.etapa}>
                  <div className="flex justify-between text-label-small">
                    <span className="text-text-secondary">{etapa.etapa}</span>
                    <span className="text-text-primary font-medium">
                      {etapa.diversos} / {etapa.total} diversos
                    </span>
                  </div>
                  <div className="w-full h-6 bg-bg-tertiary rounded-full mt-1 overflow-hidden flex">
                    <div
                      className="h-full bg-brand-tertiary flex items-center justify-end pr-2 text-xs text-white font-medium transition-all duration-500"
                      style={{
                        width: `${(etapa.diversos / Math.max(etapa.total, 1)) * 100}%`,
                      }}
                    >
                      {porcentajeDiverso > 0 && `${Math.round(porcentajeDiverso)}%`}
                    </div>
                    <div
                      className="h-full bg-badge-success-bg/30 flex items-center justify-end pr-2 text-xs text-text-secondary font-medium transition-all duration-500"
                      style={{
                        width: `${((etapa.total - etapa.diversos) / Math.max(etapa.total, 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-bg-primary border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h4 text-text-primary">Actividad reciente</h3>
            <Link to="/actividad" className="text-label-small text-brand-secondary hover:underline">
              Ver todo
            </Link>
          </div>
          <div className="space-y-4">
            {data.actividadesRecientes.map((act) => {
              let icon = 'fa-envelope';
              let color = 'text-brand-secondary';
              if (act.tipo === 'entrevista') { icon = 'fa-calendar-check'; color = 'text-brand-tertiary'; }
              else if (act.tipo === 'contratacion') { icon = 'fa-user-check'; color = 'text-badge-success-text'; }
              else if (act.tipo === 'matching') { icon = 'fa-robot'; color = 'text-badge-esg-text'; }

              return (
                <div key={act.id} className="flex items-start gap-3 border-b border-border-light pb-3 last:border-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color} bg-opacity-10 shrink-0`}>
                    <i className={`fas ${icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-small text-text-primary font-medium truncate">
                      {act.candidato}
                    </p>
                    <p className="text-label-small text-text-secondary truncate">
                      {act.vacante}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-label-small text-text-tertiary">{act.fecha}</span>
                      {act.diverso && (
                        <span className="px-2 py-0.5 bg-badge-diversity-bg text-badge-diversity-text rounded-full text-[10px] font-semibold">
                          Diverso
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/vacantes"
          className="bg-bg-primary border border-border-light rounded-xl p-4 text-center hover:border-brand-secondary transition-colors shadow-sm"
        >
          <div className="w-10 h-10 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
            <i className="fas fa-briefcase text-lg" />
          </div>
          <p className="text-label-medium text-text-primary mt-2">Vacantes</p>
          <p className="text-label-small text-text-tertiary">Gestiona tus posiciones</p>
        </Link>

        <Link
          to="/candidatos"
          className="bg-bg-primary border border-border-light rounded-xl p-4 text-center hover:border-brand-secondary transition-colors shadow-sm"
        >
          <div className="w-10 h-10 mx-auto bg-brand-secondary/10 rounded-full flex items-center justify-center text-brand-secondary">
            <i className="fas fa-users text-lg" />
          </div>
          <p className="text-label-medium text-text-primary mt-2">Candidatos</p>
          <p className="text-label-small text-text-tertiary">Explora el talento</p>
        </Link>

        <Link
          to="/entrevistas"
          className="bg-bg-primary border border-border-light rounded-xl p-4 text-center hover:border-brand-secondary transition-colors shadow-sm"
        >
          <div className="w-10 h-10 mx-auto bg-brand-tertiary/10 rounded-full flex items-center justify-center text-brand-tertiary">
            <i className="fas fa-calendar-alt text-lg" />
          </div>
          <p className="text-label-medium text-text-primary mt-2">Entrevistas</p>
          <p className="text-label-small text-text-tertiary">Próximas reuniones</p>
        </Link>

        <Link
          to="/analitica"
          className="bg-bg-primary border border-border-light rounded-xl p-4 text-center hover:border-brand-secondary transition-colors shadow-sm"
        >
          <div className="w-10 h-10 mx-auto bg-badge-esg-bg/10 rounded-full flex items-center justify-center text-badge-esg-text">
            <i className="fas fa-chart-pie text-lg" />
          </div>
          <p className="text-label-medium text-text-primary mt-2">Analítica</p>
          <p className="text-label-small text-text-tertiary">Métricas ESG</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;