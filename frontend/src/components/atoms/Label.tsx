import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, required, className = '', ...props }) => {
  return (
    <label
      className={`block text-label-large text-text-primary mb-2 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-badge-error-text ml-1">*</span>}
    </label>
  );
};

export default Label;