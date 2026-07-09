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
  // Estado sin datos suficientes
  if (data.length < 2) {
    return (
      <section className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm">
        <header className="text-center">
          <h3 className="mb-2 text-h2 font-semibold text-text-primary">
            {title}
          </h3>

          <p className="text-body-large text-text-secondary">
            No hay suficientes datos para calcular la tasa de abandono.
          </p>
        </header>
      </section>
    );
  }

  // El primer valor (Shortlist) es la referencia
  const shortlist = data[0].value;

  // Evitamos división por cero
  if (shortlist <= 0) {
    return (
      <section className="rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm">
        <header className="text-center">
          <h3 className="mb-2 text-h2 font-semibold text-text-primary">
            {title}
          </h3>

          <p className="text-body-large text-text-secondary">
            No existen candidatos en shortlist para calcular abandonos.
          </p>
        </header>
      </section>
    );
  }

  // Calculamos el % que llega a cada etapa
  const stages = data.map((stage) => ({
    ...stage,
    percentage: Math.min(
      100,
      Math.max(0, Math.round((stage.value / shortlist) * 100)),
    ),
  }));

  // Calculamos el abandono entre etapas
  const abandonmentStages = stages.slice(1).map((stage, index) => {
    const previousPercentage = stages[index].percentage;

    return {
      stage: stage.stage.toUpperCase(),
      value: Math.max(0, previousPercentage - stage.percentage),
    };
  });

  // Seguridad extra por si no hay etapas de abandono
  const worstStage = abandonmentStages.length
    ? abandonmentStages.reduce((max, current) =>
        current.value > max.value ? current : max,
      )
    : null;

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
            colorClassName={stageColors[index % stageColors.length]}
          />
        ))}
      </div>

      {/* Mensaje */}
      {worstStage && (
        <div className="mt-8">
          <AlertMessage
            title={`El problema está en la etapa de ${formatStage(worstStage.stage)}.`}
            description={`El ${worstStage.value}% de los candidatos abandonan el proceso durante la etapa de ${formatStage(worstStage.stage)}.`}
          />
        </div>
      )}
    </section>
  );
};

export default AbandonmentRateChart;
