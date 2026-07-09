import React, { useState } from 'react';

import ReportConfigPanel, {
  type ReportConfig,
} from '../../components/organisms/ReportConfigPanel';

import ESGReportPreview from '../../components/organisms/ESGReportPreview';

import { diversityMock, selectionFunnelMock } from '../../mocks/esg.mock';

const ReportesESG: React.FC = () => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    companyName: 'ImpactHire Demo',
    period: 'Q2 2026',
    objective: 40,
    achieved: 45,
    generatedAt: '09/07/2026',
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-h2 leading-h2 text-text-secondary max-w-2xl">
          Genera reportes de cumplimiento ESG para inversores, reguladores y
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
            diversityData={diversityMock}
            funnelData={selectionFunnelMock}
          />
        </div>
      </div>
    </>
  );
};

export default ReportesESG;
