import React from 'react';
import { TrendingDown } from 'lucide-react';

interface FunnelBadgeProps {
  label?: string;
  value: number;
}

const FunnelBadge: React.FC<FunnelBadgeProps> = ({ value, label }) => {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-1
        rounded-full
        bg-badge-success-bg
        px-4
        py-1
        text-badge
        font-semibold
        text-badge-success-text
      "
    >
      <TrendingDown size={14} strokeWidth={2.5} />

      <span>
        {value}%{label ? ` ${label}` : ''}
      </span>
    </div>
  );
};

export default FunnelBadge;
