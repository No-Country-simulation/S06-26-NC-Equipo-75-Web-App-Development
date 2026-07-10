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
  const baseStyles =
    'rounded-lg border bg-input-bg p-3 text-body-medium leading-body-medium text-input-text placeholder:text-input-placeholder outline-none transition-colors';

  const variantStyles = {
    default:
      'border-input-border hover:border-input-hover focus:border-input-focus',

    error:
      'border-input-error hover:border-input-error focus:border-input-error',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed bg-bg-tertiary'
    : '';
  return (
    <input
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
