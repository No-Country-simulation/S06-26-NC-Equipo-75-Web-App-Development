import React from 'react';

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-badge-error-bg border border-badge-error-border rounded-lg p-3">
      <p className="text-label-small text-badge-error-text text-center">
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;