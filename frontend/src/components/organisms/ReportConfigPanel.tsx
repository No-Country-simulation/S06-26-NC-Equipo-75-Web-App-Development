import React from 'react';
import InputField from '../molecules/InputField';
import ReportSectionTitle from '../atoms/ReportSectionTitle';
import Button from '../atoms/Button';
import { exportReportPdf } from '../../utils/exportPdf';

export interface ReportConfig {
  companyName: string;
  period: string;
  objective: number;
  achieved: number;
  generatedAt: string;

  showSummary: boolean;
  showDiversity: boolean;
  showFunnel: boolean;
  showAbandonment: boolean;
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

  const updateCheckbox = (field: keyof ReportConfig, checked: boolean) => {
    onChange({
      ...config,
      [field]: checked,
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

      <div className="pt-4 border-t border-border-light">
        <h3 className="mb-4 text-body-large font-semibold text-text-primary">
          Contenido del reporte
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showSummary}
              onChange={(e) => updateCheckbox('showSummary', e.target.checked)}
            />
            <span>Resumen Ejecutivo</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showDiversity}
              onChange={(e) =>
                updateCheckbox('showDiversity', e.target.checked)
              }
            />
            <span>Distribución de diversidad</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showFunnel}
              onChange={(e) => updateCheckbox('showFunnel', e.target.checked)}
            />
            <span>Embudo de selección</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showAbandonment}
              onChange={(e) =>
                updateCheckbox('showAbandonment', e.target.checked)
              }
            />
            <span>Tasa de abandono</span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={exportReportPdf}>Generar Reporte</Button>
      </div>
    </section>
  );
};

export default ReportConfigPanel;
