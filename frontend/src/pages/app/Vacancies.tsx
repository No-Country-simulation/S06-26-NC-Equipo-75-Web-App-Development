import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Vacancie {
  id: string;
  titulo: string;
  nivel: 'Trainee' | 'Junior' | 'Semi Senior' | 'Senior' | 'Lead';
  region: string;
  estado: 'Abierto' | 'Pausado' | 'Cerrado';
}

const mockVacancies: Vacancie[] = [
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

  const filteredVacancies = mockVacancies.filter((vac) => {
    const matchesSearch = vac.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = estadoFilter === 'Todos' || vac.estado === estadoFilter;
    return matchesSearch && matchesEstado;
  });

  const totalPages = Math.ceil(filteredVacancies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVacancies = filteredVacancies.slice(startIndex, endIndex);

  const total = mockVacancies.length;
  const abiertas = mockVacancies.filter(v => v.estado === 'Abierto').length;
  const pausadas = mockVacancies.filter(v => v.estado === 'Pausado').length;
  const cerradas = mockVacancies.filter(v => v.estado === 'Cerrado').length;

  const getEstadoColor = (estado: Vacancie['estado']) => {
    switch (estado) {
      case 'Abierto': return 'text-badge-success-text bg-badge-success-bg';
      case 'Pausado': return 'text-badge-warning-text bg-badge-warning-bg';
      case 'Cerrado': return 'text-badge-error-text bg-badge-error-bg';
      default: return 'text-text-secondary bg-bg-tertiary';
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      {/* ========== SIDEBAR ========== */}
      <aside className="w-64 bg-bg-primary border-r border-border-light flex-shrink-0 p-6 hidden md:block">
        <div className="mb-8">
          <h1 className="text-h3 font-bold text-text-primary">ImpactHire</h1>
          <p className="text-label-small text-text-secondary mt-1">RH · Gestión de Talento</p>
        </div>

        <nav className="space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-nav-item text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors">
            <i className="fas fa-chart-line w-5 text-center" />
            Dashboard
          </Link>
          <Link to="/Vacancies" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-nav-item bg-brand-secondary/10 text-brand-secondary font-medium transition-colors">
            <i className="fas fa-briefcase w-5 text-center" />
            Vacancies
          </Link>
          <Link to="/candidatos" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-nav-item text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors">
            <i className="fas fa-users w-5 text-center" />
            Candidatos
          </Link>
        </nav>

        <div className="mt-8 pt-6 border-t border-border-light">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-brand-tertiary/10 text-brand-tertiary hover:bg-brand-tertiary/20 transition-colors text-nav-item font-medium">
            <i className="fas fa-map-marked-alt w-5 text-center" />
            Mapa de Talento
          </button>
        </div>

        {/* Indicadores ESG */}
        <div className="mt-6 p-4 bg-bg-tertiary rounded-xl border border-border-light">
          <p className="text-label-small text-text-secondary font-medium">Indicadores ESG</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-label-small">
              <span className="text-text-secondary">Diversidad Shortlist</span>
              <span className="text-brand-tertiary font-semibold">38%</span>
            </div>
            <div className="flex justify-between text-label-small">
              <span className="text-text-secondary">Contrataciones</span>
              <span className="text-brand-tertiary font-semibold">42%</span>
            </div>
            <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden mt-1">
              <div className="h-full w-[42%] bg-brand-tertiary rounded-full" />
            </div>
            <p className="text-label-small text-text-tertiary">Meta: 40% · +2% sobre meta</p>
          </div>
        </div>
      </aside>

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <main className="flex-1 p-6 md:p-8 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-h1 text-text-primary">Vacancies</h1>
            <p className="text-body-medium text-text-secondary">
              Encuentra talento compatible y gestiona cada Vacancie desde un solo lugar.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-button-primary text-button-primary-text rounded-lg font-semibold text-button-medium hover:bg-button-primary-hover transition-colors flex items-center gap-2 flex-shrink-0">
            <i className="fas fa-plus" />
            Crear Vacancie
          </button>
        </div>

        {/* TARJETAS DE MÉTRICAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-bg-primary border border-border-light rounded-xl p-4 shadow-sm">
            <p className="text-label-small text-text-secondary">Vacancies totales</p>
            <p className="text-metric-large text-text-primary font-bold mt-1">{total}</p>
          </div>
          <div className="bg-bg-primary border border-border-light rounded-xl p-4 shadow-sm">
            <p className="text-label-small text-text-secondary">Abiertas</p>
            <p className="text-metric-large text-badge-success-text font-bold mt-1">{abiertas}</p>
          </div>
          <div className="bg-bg-primary border border-border-light rounded-xl p-4 shadow-sm">
            <p className="text-label-small text-text-secondary">Pausadas</p>
            <p className="text-metric-large text-badge-warning-text font-bold mt-1">{pausadas}</p>
          </div>
          <div className="bg-bg-primary border border-border-light rounded-xl p-4 shadow-sm">
            <p className="text-label-small text-text-secondary">Cerradas</p>
            <p className="text-metric-large text-badge-error-text font-bold mt-1">{cerradas}</p>
          </div>
        </div>

        {/* BUSCADOR Y FILTROS */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Buscar Vacancies..."
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

        {/* TABLA DE VacancieS */}
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
                {currentVacancies.length > 0 ? (
                  currentVacancies.map((vac) => (
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
                      No se encontraron Vacancies que coincidan con los filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINACIÓN */}
          {filteredVacancies.length > 0 && (
            <div className="px-6 py-4 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4 text-label-small text-text-secondary">
              <span>
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredVacancies.length)} de {filteredVacancies.length} resultados
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

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border-light text-label-small text-text-tertiary">
          <p>© 2026 ImpactHire. All rights reserved.</p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-primary transition-colors">Help Center</a>
            <button className="flex items-center gap-1.5 text-badge-error-text hover:underline transition-colors">
              <i className="fas fa-sign-out-alt" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Vacancies;