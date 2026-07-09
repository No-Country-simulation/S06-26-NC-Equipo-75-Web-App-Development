import React from 'react';

import ReportHeader from '../molecules/ReportHeader';
import ReportExecutiveSummary from '../molecules/ReportExecutiveSummary';
import ReportFooter from '../molecules/ReportFooter';

import ReportSectionTitle from '../atoms/ReportSectionTitle';
import ReportDivider from '../atoms/ReportDivider';

import DiversityPieChart from './DiversityPieChart';
import AbandonmentRateChart from './AbandonmentRateChart';
import SelectionFunnel from './SelectionFunnel';
import { type FunnelStageType } from '../../mocks/esg.types';

interface ESGReportPreviewProps {
  companyName: string;
  generatedAt: string;

  period: string;
  objective: number;
  achieved: number;

  reportTitle?: string;

  showSummary: boolean;
  showDiversity: boolean;
  showFunnel: boolean;
  showAbandonment: boolean;

  diversityData: {
    name: string;
    value: number;
  }[];

  funnelData: FunnelStageType[];
}
const ESGReportPreview: React.FC<ESGReportPreviewProps> = ({
  companyName,
  generatedAt,
  period,
  objective,
  achieved,
  reportTitle,

  showSummary,
  showDiversity,
  showFunnel,
  showAbandonment,

  diversityData,
  funnelData,
}) => {
  return (
    <section
      id="esg-report"
      className="rounded-xl border border-border-light bg-bg-primary p-8 shadow-sm"
    >
      {/* Encabezado */}
      <ReportHeader
        companyName={companyName}
        generatedAt={generatedAt}
        reportTitle={reportTitle}
      />
      <div className="space-y-10">
        {showSummary && (
          <>
            <ReportExecutiveSummary
              period={period}
              companyName={companyName}
              objective={objective}
              achieved={achieved}
            />

            <ReportDivider />
          </>
        )}

        {/* Diversidad */}

        {showDiversity && (
          <>
            <ReportSectionTitle title="Distribución de diversidad" />

            <DiversityPieChart data={diversityData} compact />

            <ReportDivider />
          </>
        )}

        {/* Selección */}
        {showFunnel && (
          <>
            <ReportSectionTitle title="Proceso de selección" />

            <SelectionFunnel data={funnelData} compact />

            <ReportDivider />
          </>
        )}

        {showAbandonment && (
          <>
            <ReportSectionTitle title="Tasa de abandono por etapa" />

            <AbandonmentRateChart data={funnelData} compact />

            <ReportDivider />
          </>
        )}
      </div>
      {/* Pie */}
      <ReportFooter />
    </section>
  );
};

export default ESGReportPreview;
