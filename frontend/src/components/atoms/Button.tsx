import React from 'react';
import Spinner from './Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium' | 'small';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  const variantStyles = {
    primary:
      'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover',

    secondary:
      'border border-button-secondary-border text-button-secondary-text hover:bg-button-secondary-hover',

    tertiary:
      'bg-button-tertiary-bg text-button-tertiary-text hover:bg-button-tertiary-hover',
  };

  const sizeStyles = {
    large: 'px-6 py-3 text-button-large',
    medium: 'px-5 py-2.5 text-button-medium',
    small: 'px-3 py-1.5 text-button-small',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Spinner
          size="small"
          color={variant === 'primary' ? 'white' : 'primary'}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
