import React from 'react';
import { BriefcaseBusiness } from 'lucide-react';

interface FunnelStageProps {
  title: string;
  value: number;
  width: number;
  colorClassName: string;
}

const FunnelStage: React.FC<FunnelStageProps> = ({
  title,
  value,
  width,
  colorClassName,
}) => {
  return (
    <div
      className={`${colorClassName} flex items-center justify-between rounded-md px-5 py-3 text-text-inverse shadow-sm transition-all`}
      style={{ width: `${width}%` }}
    >
      <div className="flex items-center gap-3">
        <BriefcaseBusiness size={20} />

        <span className="text-body-large font-medium">{title}</span>
      </div>

      <span className="text-body-large font-semibold">
        {value.toLocaleString()}
      </span>
    </div>
  );
};

export default FunnelStage;
