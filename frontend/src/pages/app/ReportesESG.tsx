import ReportConfigPanel, {
  type ReportConfig,
} from '../../components/organisms/ReportConfigPanel';

import ESGReportPreview from '../../components/organisms/ESGReportPreview';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { indicadoresService } from '../../services/indicadores.service';
import { mapBadgesResponse, mapFunnelResponse } from '../../mappers/esg.mapper';
import type { DiversityCategory } from '../../mocks/esg.types';
import type { FunnelStageType } from '../../mocks/esg.types';
import { companyService } from '../../services/empresas.service';

const ReportesESG: React.FC = () => {
  const { user } = useAuth();
  const [diversityData, setDiversityData] = useState<DiversityCategory[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelStageType[]>([]);

  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    companyName: '',
    period: 'Q2 2026',
    objective: 0,
    achieved: 0,
    generatedAt: new Intl.DateTimeFormat('es-AR').format(new Date()),

    showSummary: true,
    showDiversity: true,
    showFunnel: true,
    showAbandonment: true,
  });

  useEffect(() => {
    if (!user?.companyId) return;

    const companyId = user.companyId;

    const loadESGReportData = async () => {
      try {
        const [
          companyResponse,
          metricsResponse,
          badgesResponse,
          funnelResponse,
        ] = await Promise.all([
          companyService.getCompanyById(companyId),
          indicadoresService.getMetrics(companyId),
          indicadoresService.getBadges(companyId),
          indicadoresService.getFunnel(companyId),
        ]);

        const diversityMapped = mapBadgesResponse(badgesResponse);

        setDiversityData(diversityMapped);

        setFunnelData(mapFunnelResponse(funnelResponse));

        setReportConfig((prev) => ({
          ...prev,

          companyName: companyResponse.nombre,

          objective: companyResponse.objetivoDiversidad,

          achieved: metricsResponse.averageDiversityRate,

          generatedAt: new Intl.DateTimeFormat('es-AR').format(new Date()),
        }));
      } catch (error) {
        console.error('Error cargando reporte ESG:', error);
      }
    };

    loadESGReportData();
  }, [user]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-h2 leading-h2 text-text-secondary max-w-2xl">
          Genera reportes de cumplimiento ESG para inversores, reclutadores y
          stakeholders.
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <ReportConfigPanel config={reportConfig} onChange={setReportConfig} />
        </div>

        <div className="xl:col-span-2">
          <ESGReportPreview
            {...reportConfig}
            diversityData={diversityData}
            funnelData={funnelData}
          />
        </div>
      </div>
    </>
  );
};

export default ReportesESG;
