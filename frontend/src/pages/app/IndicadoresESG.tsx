import React from 'react';
import { ChartPie } from 'lucide-react';
import KpiCard from '../../components/molecules/KpiCard';
import SelectionFunnel from '../../components/organisms/SelectionFunnel';
import AbandonmentRateChart from '../../components/organisms/AbandonmentRateChart';
import DiversityPieChart from '../../components/organisms/DiversityPieChart';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';

import { indicadoresService } from '../../services/indicadores.service';
import { mapBadgesResponse, mapFunnelResponse } from '../../mappers/esg.mapper';

import {
  type DiversityCategory,
  type FunnelStageType,
} from '../../mocks/esg.types';

import { type ESGDashboardMetrics } from '../../services/indicadores.service';

const IndicadoresESG: React.FC = () => {
  const { user } = useAuth();

  const [metrics, setMetrics] = useState<ESGDashboardMetrics | null>(null);

  const [funnelData, setFunnelData] = useState<FunnelStageType[]>([]);

  const [diversityData, setDiversityData] = useState<DiversityCategory[]>([]);

  useEffect(() => {
    if (!user?.companyId) return;

    const companyId = user.companyId;

    const loadDashboard = async () => {
      try {
        const [metricsResponse, badgesResponse, funnelResponse] =
          await Promise.all([
            indicadoresService.getMetrics(companyId),
            indicadoresService.getBadges(companyId),
            indicadoresService.getFunnel(companyId),
          ]);

        setMetrics(metricsResponse);

        setDiversityData(mapBadgesResponse(badgesResponse));

        setFunnelData(mapFunnelResponse(funnelResponse));
      } catch (error) {
        console.error('Error cargando indicadores ESG:', error);
      }
    };

    loadDashboard();
  }, [user]);

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
          value={metrics?.diversityContactRate ?? 0}
          icon={ChartPie}
          valueClassName="text-text-primary"
        />

        <KpiCard
          label="% Diversos Contratados"
          value={metrics?.diversityHiringRate ?? 0}
          icon={ChartPie}
          valueClassName="text-badge-success-text"
        />

        <KpiCard
          label="% Diversidad Promedio"
          value={metrics?.averageDiversityRate ?? 0}
          icon={ChartPie}
          valueClassName="text-badge-warning-text"
        />

        <KpiCard
          label="% Abandono"
          value={metrics?.abandonmentRate ?? 0}
          icon={ChartPie}
          valueClassName="text-badge-error-text"
        />
      </div>

      {/* GRÁFICOS */}
      {/* FILA 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <SelectionFunnel data={funnelData} />

        <AbandonmentRateChart data={funnelData} />
      </div>

      {/* FILA 2 */}
      <div className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm">
        <h3 className="mb-2 text-h2 font-semibold text-text-primary">
          Distribución de Badges
        </h3>

        <p className="mb-8 text-body-large text-text-secondary">
          Distribución de candidatos según sus categorías de diversidad.
        </p>

        <DiversityPieChart data={diversityData} />
      </div>
    </>
  );
};

export default IndicadoresESG;
