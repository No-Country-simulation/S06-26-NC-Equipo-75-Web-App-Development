import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({
  children,
  required,
  className = '',
  ...props
}) => {
  return (
    <label
      className={`block text-label-large leading-label-large font-medium text-input-label mb-2 ${className}`}
      {...props}
    >
      {children}
      {required && (
        <span className="text-badge-error-text font-semibold ml-1">*</span>
      )}
    </label>
  );
};

export default Label;
