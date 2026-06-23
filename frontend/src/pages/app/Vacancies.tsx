import React, { useState } from 'react';
import Sidebar from '../../components/organisms/Sidebar';
import Header from '../../components/organisms/Header';
import KpiCard from '../../components/molecules/KpiCard';
import {
  Briefcase,
  CheckCircle,
  PauseCircle,
  XCircle,
} from 'lucide-react';

interface Vacante {
  id: string;
  titulo: string;
  nivel: 'Trainee' | 'Junior' | 'Semi Senior' | 'Senior' | 'Lead';
  region: string;
  estado: 'Abierto' | 'Pausado' | 'Cerrado';
}

const mockVacantes: Vacante[] = [
  { id: '1', titulo: 'Analista de Datos Senior', nivel: 'Senior', region: 'São Paulo', estado: 'Abierto' },
  { id: '2', titulo: 'Frontend React Developer', nivel: 'Senior', region: 'Minas Gerais', estado: 'Abierto' },
  { id: '3', titulo: 'QA Automation Engineer', nivel: 'Senior', region: 'Porto Alegre', estado: 'Pausado' },
  { id: '4', titulo: 'Backend Node.js Developer', nivel: 'Trainee', region: 'Rio de Janeiro', estado: 'Cerrado' },
  { id: '5', titulo: 'UX/UI Designer', nivel: 'Junior', region: 'Salvador', estado: 'Abierto' },
  { id: '6', titulo: 'DevOps Engineer', nivel: 'Senior', region: 'Brasilia', estado: 'Abierto' },
  { id: '7', titulo: 'Product Manager', nivel: 'Senior', region: 'São Paulo', estado: 'Pausado' },
  { id: '8', titulo: 'Mobile Developer iOS', nivel: 'Semi Senior', region: 'Curitiba', estado: 'Abierto' },
  { id: '9', titulo: 'Data Scientist', nivel: 'Senior', region: 'Recife', estado: 'Cerrado' },
  { id: '10', titulo: 'Scrum Master', nivel: 'Semi Senior', region: 'Fortaleza', estado: 'Abierto' },
  { id: '11', titulo: 'Frontend Vue.js Developer', nivel: 'Junior', region: 'Belém', estado: 'Pausado' },
  { id: '12', titulo: 'Backend Python Developer', nivel: 'Semi Senior', region: 'São Paulo', estado: 'Abierto' },
  { id: '13', titulo: 'QA Manual Engineer', nivel: 'Junior', region: 'Manaus', estado: 'Cerrado' },
  { id: '14', titulo: 'Technical Writer', nivel: 'Junior', region: 'Florianópolis', estado: 'Abierto' },
  { id: '15', titulo: 'Machine Learning Engineer', nivel: 'Senior', region: 'Campinas', estado: 'Abierto' },
  { id: '16', titulo: 'Business Analyst', nivel: 'Semi Senior', region: 'Salvador', estado: 'Pausado' },
  { id: '17', titulo: 'Full Stack Developer', nivel: 'Senior', region: 'São Paulo', estado: 'Abierto' },
  { id: '18', titulo: 'Cloud Architect', nivel: 'Lead', region: 'Brasilia', estado: 'Cerrado' },
  { id: '19', titulo: 'UX Researcher', nivel: 'Semi Senior', region: 'Porto Alegre', estado: 'Abierto' },
  { id: '20', titulo: 'Cybersecurity Analyst', nivel: 'Senior', region: 'Rio de Janeiro', estado: 'Abierto' },
];

const Vacancies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState<'Todos' | 'Abierto' | 'Pausado' | 'Cerrado'>('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredVacantes = mockVacantes.filter((vac) => {
    const matchesSearch = vac.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = estadoFilter === 'Todos' || vac.estado === estadoFilter;
    return matchesSearch && matchesEstado;
  });

  const totalPages = Math.ceil(filteredVacantes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVacantes = filteredVacantes.slice(startIndex, endIndex);

  const total = mockVacantes.length;
  const abiertas = mockVacantes.filter(v => v.estado === 'Abierto').length;
  const pausadas = mockVacantes.filter(v => v.estado === 'Pausado').length;
  const cerradas = mockVacantes.filter(v => v.estado === 'Cerrado').length;

  const getEstadoColor = (estado: Vacante['estado']) => {
    switch (estado) {
      case 'Abierto': return 'text-badge-success-text bg-badge-success-bg';
      case 'Pausado': return 'text-badge-warning-text bg-badge-warning-bg';
      case 'Cerrado': return 'text-badge-error-text bg-badge-error-bg';
      default: return 'text-text-secondary bg-bg-tertiary';
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col">
      {/* HEADER (ancho completo) */}
      <Header title="Vacantes" userInitials="RH" />

      {/* CONTENEDOR PRINCIPAL: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="shrink-0 self-stretch">
          <Sidebar />
        </div>

        {/* Main: contenido + footer */}
        <main className="flex-1 flex flex-col min-h-0">
          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Botón Crear Vacante */}
            <div className="flex justify-end">
              <button className="px-5 py-2.5 bg-button-primary text-button-primary-text rounded-lg font-semibold text-button-medium hover:bg-button-primary-hover transition-colors flex items-center gap-2 shrink-0">
                <i className="fas fa-plus" />
                Crear Vacante
              </button>
            </div>

            {/* Tarjetas de métricas con KpiCard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KpiCard
                label="Vacantes totales"
                value={total}
                icon={Briefcase}
                valueClassName="text-text-primary"
              />
              <KpiCard
                label="Abiertas"
                value={abiertas}
                icon={CheckCircle}
                valueClassName="text-badge-success-text"
              />
              <KpiCard
                label="Pausadas"
                value={pausadas}
                icon={PauseCircle}
                valueClassName="text-badge-warning-text"
              />
              <KpiCard
                label="Cerradas"
                value={cerradas}
                icon={XCircle}
                valueClassName="text-badge-error-text"
              />
            </div>

            {/* Buscador y filtros */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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
                    className={`px-4 py-1.5 rounded-full text-label-small font-medium transition-colors ${
                      estadoFilter === estado
                        ? 'bg-brand-secondary text-white'
                        : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    {estado}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabla */}
            <div className="bg-bg-primary border border-border-light rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-bg-tertiary border-b border-border-light">
                    <tr>
                      <th className="px-6 py-3 text-label-small text-text-secondary font-semibold uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-label-small text-text-secondary font-semibold uppercase tracking-wider hidden md:table-cell">Nivel</th>
                      <th className="px-6 py-3 text-label-small text-text-secondary font-semibold uppercase tracking-wider hidden md:table-cell">Región</th>
                      <th className="px-6 py-3 text-label-small text-text-secondary font-semibold uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-label-small text-text-secondary font-semibold uppercase tracking-wider text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {currentVacantes.length > 0 ? (
                      currentVacantes.map((vac) => (
                        <tr key={vac.id} className="hover:bg-bg-tertiary/50 transition-colors">
                          <td className="px-6 py-4 text-body-medium text-text-primary font-medium">
                            {vac.titulo}
                          </td>
                          <td className="px-6 py-4 text-body-small text-text-secondary hidden md:table-cell">
                            {vac.nivel}
                          </td>
                          <td className="px-6 py-4 text-body-small text-text-secondary hidden md:table-cell">
                            {vac.region}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-label-small font-medium ${getEstadoColor(vac.estado)}`}>
                              {vac.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button className="text-text-tertiary hover:text-brand-secondary transition-colors" title="Ver detalles">
                                <i className="fas fa-eye" />
                              </button>
                              <button className="text-text-tertiary hover:text-brand-secondary transition-colors" title="Editar">
                                <i className="fas fa-pen" />
                              </button>
                              <button className="text-text-tertiary hover:text-badge-error-text transition-colors" title="Eliminar">
                                <i className="fas fa-trash-alt" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-body-medium text-text-secondary">
                          <i className="fas fa-search text-3xl text-text-tertiary block mb-2" />
                          No se encontraron vacantes que coincidan con los filtros.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {filteredVacantes.length > 0 && (
                <div className="px-6 py-4 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4 text-label-small text-text-secondary">
                  <span>
                    Mostrando {startIndex + 1} a {Math.min(endIndex, filteredVacantes.length)} de {filteredVacantes.length} resultados
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-border-light hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Anterior
                    </button>
                    <span className="px-3 py-1.5">
                      Página {currentPage} de {totalPages || 1}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="px-3 py-1.5 rounded-lg border border-border-light hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border-light bg-bg-primary px-6 md:px-8 py-4 shrink-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-label-small text-text-tertiary">
              <p>© 2026 ImpactHire. All rights reserved.</p>
              <div className="flex items-center gap-6 flex-wrap justify-center">
                <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-text-primary transition-colors">Help Center</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vacancies;