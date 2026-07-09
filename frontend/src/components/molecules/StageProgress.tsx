import React from 'react';
import ProgressBar from '../atoms/ProgressBar';

interface StageProgressProps {
  stage: string;
  percentage: number;
  colorClassName: string;
}

const StageProgress: React.FC<StageProgressProps> = ({
  stage,
  percentage,
  colorClassName,
}) => {
  return (
    <div className="space-y-2">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <span className="text-body-large font-medium text-text-primary">
          {stage}
        </span>

        <span className="text-body-large font-semibold text-text-secondary">
          {percentage}%
        </span>
      </div>

      {/* Barra */}
      <ProgressBar value={percentage} colorClassName={colorClassName} />
    </div>
  );
};

export default StageProgress;
