import React from 'react';

interface ReportDividerProps {
  className?: string;
  variant?: 'light' | 'medium' | 'strong';
}

const variants = {
  light: 'border-border-light',
  medium: 'border-border-medium',
  strong: 'border-border-strong',
};

const ReportDivider: React.FC<ReportDividerProps> = ({
  className = '',
  variant = 'medium',
}) => {
  return (
    <hr
      className={`w-full border-0 border-t ${variants[variant]} ${className}`}
    />
  );
};

export default ReportDivider;
