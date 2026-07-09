import React from 'react';
import AlertMessage from '../atoms/AlertMessage';
import StageProgress from '../molecules/StageProgress';
import { type FunnelStageType } from '../../mocks/esg.types';

const stageColors = ['bg-chart-5', 'bg-chart-2', 'bg-chart-1', 'bg-chart-4'];

interface AbandonmentRateChartProps {
  title?: string;
  description?: string;
  data: FunnelStageType[];
}

const AbandonmentRateChart: React.FC<AbandonmentRateChartProps> = ({
  title = 'Tasa de Abandono por Etapa',
  description = 'Identifica en qué etapa del proceso se pierde la mayor cantidad de candidatos.',
  data,
}) => {
  if (data.length < 2) return null;

  // El primer valor (Shortlist) es la referencia
  const shortlist = data[0].value;

  // Calculamos el % que llega a cada etapa
  const stages = data.map((stage) => ({
    ...stage,
    percentage: Math.round((stage.value / shortlist) * 100),
  }));

  // Calculamos el abandono entre etapas
  const abandonmentStages = stages.slice(1).map((stage, index) => {
    const previousPercentage = stages[index].percentage;

    return {
      stage: stage.stage.toUpperCase(),
      value: previousPercentage - stage.percentage,
    };
  });

  // Buscamos la etapa con mayor abandono
  const worstStage = abandonmentStages.reduce((max, current) =>
    current.value > max.value ? current : max,
  );

  const formatStage = (stage: string) =>
    stage.charAt(0).toUpperCase() + stage.slice(1).toLowerCase();

  return (
    <section className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm">
      {/* Encabezado */}
      <header className="mb-8 text-center">
        <h3 className="mb-2 text-h2 font-semibold text-text-primary">
          {title}
        </h3>

        <p className="mx-auto max-w-xl text-body-large text-text-secondary">
          {description}
        </p>
      </header>

      {/* Barras */}
      <div className="space-y-6">
        {stages.map((stage, index) => (
          <StageProgress
            key={stage.stage}
            stage={stage.stage}
            percentage={stage.percentage}
            colorClassName={stageColors[index]}
          />
        ))}
      </div>

      {/* Mensaje */}
      <div className="mt-8">
        <AlertMessage
          title={`El problema está en la etapa de ${formatStage(worstStage.stage)}.`}
          description={`El ${worstStage.value}% de los candidatos abandonan el proceso durante la etapa de ${formatStage(worstStage.stage.toLowerCase())}.`}
        />
      </div>
    </section>
  );
};

export default AbandonmentRateChart;
