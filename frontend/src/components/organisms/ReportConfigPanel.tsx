import React from 'react';

import InputField from '../molecules/InputField';
import ReportSectionTitle from '../atoms/ReportSectionTitle';
import Button from '../atoms/Button';

export interface ReportConfig {
  companyName: string;
  period: string;
  objective: number;
  achieved: number;
  generatedAt: string;
}

interface ReportConfigPanelProps {
  config: ReportConfig;
  onChange: (config: ReportConfig) => void;
}

const ReportConfigPanel: React.FC<ReportConfigPanelProps> = ({
  config,
  onChange,
}) => {
  const updateField = (field: keyof ReportConfig, value: string) => {
    onChange({
      ...config,
      [field]:
        field === 'objective' || field === 'achieved' ? Number(value) : value,
    });
  };

  return (
    <section className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm">
      <ReportSectionTitle title="Configuración del Reporte ESG" />

      <div className="mt-6 space-y-5">
        <InputField
          id="companyName"
          name="companyName"
          label="Empresa"
          value={config.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
          required
        />

        <InputField
          id="period"
          name="period"
          label="Período evaluado"
          placeholder="Ej: Q2 2026"
          value={config.period}
          onChange={(e) => updateField('period', e.target.value)}
        />

        <InputField
          id="objective"
          name="objective"
          label="Objetivo ESG (%)"
          placeholder="Ej: 40"
          value={String(config.objective)}
          onChange={(e) => updateField('objective', e.target.value)}
        />

        <InputField
          id="achieved"
          name="achieved"
          label="Resultado alcanzado (%)"
          placeholder="Ej: 45"
          value={String(config.achieved)}
          onChange={(e) => updateField('achieved', e.target.value)}
        />

        <InputField
          id="generatedAt"
          name="generatedAt"
          label="Fecha de generación"
          placeholder="09/07/2026"
          value={config.generatedAt}
          onChange={(e) => updateField('generatedAt', e.target.value)}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button>Generar Reporte</Button>
      </div>
    </section>
  );
};

export default ReportConfigPanel;
