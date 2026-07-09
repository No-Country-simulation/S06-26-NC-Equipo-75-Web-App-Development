import React from 'react';
import FunnelBadge from '../atoms/FunnelBadge';
import FunnelStage from '../molecules/FunnelStage';
import { type FunnelStageType } from '../../mocks/esg.types';

const stageColors = ['bg-chart-5', 'bg-chart-2', 'bg-chart-1', 'bg-chart-4'];

interface SelectionFunnelProps {
  title?: string;
  description?: string;
  data: FunnelStageType[];
}

const INITIAL_WIDTH = 100;
const STEP = 15; // reduce 15% por etapa

const SelectionFunnel: React.FC<SelectionFunnelProps> = ({
  title = 'Embudo de Selección',
  description = 'Visualiza cuántos candidatos avanzan en cada etapa del proceso de selección.',
  data,
}) => {
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

      {/* Embudo */}
      <div className="flex flex-col gap-5">
        {data.map((stage, index) => {
          const width = INITIAL_WIDTH - index * STEP;
          return (
            <React.Fragment key={stage.stage}>
              <div className="flex justify-center">
                <FunnelStage
                  title={stage.stage}
                  value={stage.value}
                  width={width}
                  colorClassName={stageColors[index]}
                />
              </div>

              {index < data.length - 1 && stage.conversion !== undefined && (
                <div className="flex justify-center">
                  <FunnelBadge value={stage.conversion} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default SelectionFunnel;
