import React from 'react';
import { TriangleAlert } from 'lucide-react';

interface AlertMessageProps {
  title: string;
  description: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ title, description }) => {
  return (
    <div className="flex gap-4 rounded-lg border border-dashed border-status-error bg-badge-error-bg p-4">
      <div className="mt-1 shrink-0">
        <TriangleAlert
          size={28}
          className="text-status-error"
          strokeWidth={2}
        />
      </div>

      <div>
        <h4 className="mb-1 text-h4 font-semibold text-status-error">
          {title}
        </h4>

        <p className="text-body-medium text-text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default AlertMessage;
