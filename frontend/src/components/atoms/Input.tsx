import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  fullWidth = true,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'rounded-lg border bg-input-bg p-3 text-body-medium text-text-primary placeholder:text-text-tertiary outline-none transition-colors focus:outline-none';
  
  const variantStyles = {
    default: 'border-input-border focus:border-input-focus',
    error: 'border-badge-error-border focus:border-badge-error-border bg-badge-error-bg/5',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed bg-bg-tertiary' : '';
  
  return (
    <input
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;