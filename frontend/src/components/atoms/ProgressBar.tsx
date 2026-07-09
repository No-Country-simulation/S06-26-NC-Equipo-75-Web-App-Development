import React from 'react';

interface ProgressBarProps {
  value: number;
  colorClassName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, colorClassName }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className="h-6 w-full overflow-hidden rounded-full bg-bg-tertiary"
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorClassName}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};

export default ProgressBar;
