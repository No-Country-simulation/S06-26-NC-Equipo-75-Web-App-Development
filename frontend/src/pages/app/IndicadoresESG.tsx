import React from 'react';
import { ChartPie } from 'lucide-react';
import KpiCard from '../../components/molecules/KpiCard';
import SelectionFunnel from '../../components/organisms/SelectionFunnel';
import AbandonmentRateChart from '../../components/organisms/AbandonmentRateChart';
import DiversityPieChart from '../../components/organisms/DiversityPieChart';
import { selectionFunnelMock, diversityMock } from '../../mocks/esg.mock';

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
          label="% Diversos Contactados"
          value={25}
          icon={ChartPie}
          valueClassName="text-text-primary"
        />

        <KpiCard
          label="% Diversos Contratados"
          value={42}
          icon={ChartPie}
          valueClassName="text-badge-success-text"
        />

        <KpiCard
          label="% Diversidad Promedio"
          value={36}
          icon={ChartPie}
          valueClassName="text-badge-warning-text"
        />

        <KpiCard
          label="% Abandono"
          value={68}
          icon={ChartPie}
          valueClassName="text-badge-error-text"
        />
      </div>

      {/* GRÁFICOS */}
      {/* FILA 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <SelectionFunnel data={selectionFunnelMock} />

        <AbandonmentRateChart data={selectionFunnelMock} />
      </div>

      {/* FILA 2 */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm">
        <h3 className="mb-2 text-h2 font-semibold text-text-primary">
          Distribución de Badges
        </h3>

        <p className="mb-8 text-body-large text-text-secondary">
          Distribución de candidatos según sus categorías de diversidad.
        </p>

        <DiversityPieChart data={diversityMock} />
      </div>
    </>
  );
};

export default IndicadoresESG;
