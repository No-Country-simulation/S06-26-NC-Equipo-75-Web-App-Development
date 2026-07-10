import React from 'react';
import { TriangleAlert, type LucideIcon } from 'lucide-react';

interface AlertMessageProps {
  title: string;
  description: string;
  variant?: 'error' | 'warning' | 'success' | 'info';
  icon?: LucideIcon;
}

const styles: Record<
  NonNullable<AlertMessageProps['variant']>,
  {
    border: string;
    bg: string;
    text: string;
  }
> = {
  error: {
    border: 'border-status-error',
    bg: 'bg-badge-error-bg',
    text: 'text-status-error',
  },
  warning: {
    border: 'border-status-warning',
    bg: 'bg-badge-warning-bg',
    text: 'text-status-warning',
  },
  success: {
    border: 'border-status-success',
    bg: 'bg-badge-success-bg',
    text: 'text-status-success',
  },
  info: {
    border: 'border-brand-secondary',
    bg: 'bg-badge-esg-bg',
    text: 'text-brand-secondary',
  },
};
const AlertMessage: React.FC<AlertMessageProps> = ({
  title,
  description,
  variant = 'error',
  icon,
}) => {
  const { border, bg, text } = styles[variant];

  const AlertIcon = icon ?? TriangleAlert;

  return (
    <div
      className={`flex gap-4 rounded-lg border border-dashed ${border} ${bg} p-4`}
    >
      <div className="mt-1 shrink-0">
        <AlertIcon size={28} className={text} strokeWidth={2} />
      </div>

      <div>
        <h4 className={`mb-1 text-h4 font-semibold ${text}`}>{title}</h4>

        <p className="text-body-medium text-text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default AlertMessage;
