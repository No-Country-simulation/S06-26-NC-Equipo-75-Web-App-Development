import React from 'react';
import { User } from 'lucide-react';
import KpiCard from '../../components/molecules/KpiCard';

const IndicadoresESG: React.FC = () => {
  return (
    <>
      {/* ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-h2 leading-h2 text-text-secondary max-w-2xl">
          Métricas consolidadas de diversidad en todas las vacantes.
        </h2>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Reclutadores totales"
          value={77}
          icon={User}
          valueClassName="text-text-primary"
        />

        <KpiCard
          label="Vacantes totales"
          value={42}
          icon={User}
          valueClassName="text-badge-success-text"
        />

        <KpiCard
          label="Contrataciones"
          value={43}
          icon={User}
          valueClassName="text-badge-warning-text"
        />

        <KpiCard
          label="Objetivo de Diversidad"
          value={44}
          icon={User}
          valueClassName="text-badge-error-text"
        />
      </div>
    </>
  );
};

export default IndicadoresESG;
