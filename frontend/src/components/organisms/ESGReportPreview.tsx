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
  diversityData,
  funnelData,
}) => {
  return (
    <section className="rounded-xl border border-border-light bg-bg-primary p-8 shadow-sm">
      {/* Encabezado */}
      <ReportHeader
        companyName={companyName}
        generatedAt={generatedAt}
        reportTitle={reportTitle}
      />

      <ReportExecutiveSummary
        period={period}
        companyName={companyName}
        objective={objective}
        achieved={achieved}
      />

      <ReportDivider />

      {/* Diversidad */}
      <ReportSectionTitle title="Distribución de diversidad" />

      <DiversityPieChart data={diversityData} compact />

      <ReportDivider />

      {/* Selección */}
      <ReportSectionTitle title="Proceso de selección" />

      <div className="space-y-8">
        <SelectionFunnel data={funnelData} compact />

        <AbandonmentRateChart data={funnelData} compact />
      </div>

      <ReportDivider />

      {/* Pie */}
      <ReportFooter />
    </section>
  );
};

export default ESGReportPreview;
