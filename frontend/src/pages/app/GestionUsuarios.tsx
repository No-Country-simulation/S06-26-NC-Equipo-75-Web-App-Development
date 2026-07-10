import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../components/atoms/Button';
import { User, Plus, Eye } from 'lucide-react';
import KpiCard from '../../components/molecules/KpiCard';
import DataTable, { type Column } from '../../components/organisms/DataTable';
import SearchBar from '../../components/molecules/SearchBar';
import Modal from '../../components/molecules/Modal';
import {
  recruiterService,
  type Recruiter,
  type CreateRecruiterRequest,
} from '../../services/recruiter.service';
import RecruiterForm from '../../components/organisms/RecruiterForm';
import { useToast } from '../../hooks/useToast';

const ITEMS_PER_PAGE = 5;

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Recruiter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(
    null,
  );
  const [loadingRecruiter, setLoadingRecruiter] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    loadRecruiters();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleCreateRecruiter = async (data: CreateRecruiterRequest) => {
    try {
      setIsCreating(true);

      await recruiterService.createRecruiter(data);
      await loadRecruiters();
      setIsCreateModalOpen(false);
      success('Reclutador creado correctamente.');
    } catch (err) {
      error('No fue posible crear el reclutador.');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const loadRecruiters = async () => {
    try {
      setLoading(true);
      const data = await recruiterService.getRecruiters();
      setUsuarios(data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      error('No fue posible cargar los reclutadores.');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecruiter = async (id: string) => {
    try {
      setLoadingRecruiter(true);

      const recruiter = await recruiterService.getRecruiterById(id);

      setSelectedRecruiter(recruiter);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRecruiter(false);
    }
  };

  const filteredUsuarios = useMemo(() => {
    return usuarios.filter((usuario) => {
      const textoBusqueda = searchTerm.toLowerCase();

      return (
        usuario.nombre.toLowerCase().includes(textoBusqueda) ||
        usuario.apellido.toLowerCase().includes(textoBusqueda) ||
        `${usuario.nombre} ${usuario.apellido}`
          .toLowerCase()
          .includes(textoBusqueda) ||
        usuario.email.toLowerCase().includes(textoBusqueda)
      );
    });
  }, [usuarios, searchTerm]);

  const totalPages = Math.ceil(filteredUsuarios.length / ITEMS_PER_PAGE);

  const columns: Column<Recruiter>[] = [
    {
      key: 'nombre',
      header: 'Nombre',
    },
    {
      key: 'apellido',
      header: 'Apellido',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'rol',
      header: 'Rol',
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (usuario) => (
        <button
          onClick={() => handleViewRecruiter(usuario.id)}
          className="rounded-lg p-2 text-primary hover:bg-bg-secondary transition-colors"
          title="Ver detalles"
        >
          <Eye className="h-5 w-5" />
        </button>
      ),
    },
  ];

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {/* ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-h2 leading-h2 text-text-secondary max-w-2xl">
          Administra los reclutadores de tu empresa y controla el acceso a la
          plataforma.
        </h2>

        <Button
          variant="primary"
          size="medium"
          className="shrink-0"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-5 w-5" />
          Agregar Reclutador
        </Button>
      </div>
      {/*Modal*/}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Agregar Reclutador"
        maxWidth="md"
      >
        <RecruiterForm
          onSubmit={handleCreateRecruiter}
          onClose={() => setIsCreateModalOpen(false)}
          isLoading={isCreating}
        />
      </Modal>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Reclutadores totales"
          value={usuarios.length}
          icon={User}
          valueClassName="text-text-primary"
        />

        <KpiCard
          label="Vacantes totales"
          value={0}
          icon={User}
          valueClassName="text-badge-success-text"
        />

        <KpiCard
          label="Contrataciones"
          value={0}
          icon={User}
          valueClassName="text-badge-warning-text"
        />

        <KpiCard
          label="Objetivo de Diversidad"
          value={0}
          icon={User}
          valueClassName="text-badge-error-text"
        />
      </div>

      {/* Buscador */}
      <div className="flex justify-between items-center mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nombre o email..."
          className="sm:w-145"
        />
      </div>

      {/* Tabla */}
      <DataTable
        data={filteredUsuarios}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      {/* Modal de visualización */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalle del Reclutador"
        maxWidth="md"
      >
        {loadingRecruiter ? (
          <p>Cargando...</p>
        ) : selectedRecruiter ? (
          <div className="space-y-5">
            <div>
              <p className="text-label-small text-text-secondary">Nombre</p>
              <p className="text-body-medium font-medium">
                {selectedRecruiter.nombre}
              </p>
            </div>

            <div>
              <p className="text-label-small text-text-secondary">Apellido</p>
              <p className="text-body-medium font-medium">
                {selectedRecruiter.apellido}
              </p>
            </div>

            <div>
              <p className="text-label-small text-text-secondary">Email</p>
              <p className="text-body-medium font-medium">
                {selectedRecruiter.email}
              </p>
            </div>

            <div>
              <p className="text-label-small text-text-secondary">Rol</p>
              <p className="text-body-medium font-medium">
                {selectedRecruiter.rol}
              </p>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default GestionUsuarios;
