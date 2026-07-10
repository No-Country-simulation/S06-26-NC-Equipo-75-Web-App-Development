import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ReportSectionTitleProps {
  title: string;
  icon?: LucideIcon;
  className?: string;
}

const ReportSectionTitle: React.FC<ReportSectionTitleProps> = ({
  title,
  icon: Icon,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Icon && <Icon size={18} className="text-brand-secondary shrink-0" />}

      <h2 className="text-h3 leading-h3 font-semibold text-text-primary">
        {title}
      </h2>
    </div>
  );
};

export default ReportSectionTitle;
