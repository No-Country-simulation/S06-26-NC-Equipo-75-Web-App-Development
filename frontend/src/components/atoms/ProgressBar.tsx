import React from 'react';

interface ProgressBarProps {
  value: number;
  colorClassName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, colorClassName }) => {
  return (
    <div className="h-6 w-full overflow-hidden rounded-full bg-bg-tertiary">
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorClassName}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;
