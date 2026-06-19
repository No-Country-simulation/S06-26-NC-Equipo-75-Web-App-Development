import React from 'react';
import brandLogo from '../../assets/images/brand.svg';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string; // ← Ahora opcional
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-bg-primary rounded-xl border border-border-light shadow-sm p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={brandLogo} alt="ImpactHire" className="h-12 w-auto" />
        </div>

        {/* Títulos */}
        <h1 className="text-display-small leading-display-small font-semibold text-text-primary text-center mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body-medium leading-body-medium font-normal text-text-secondary text-center mb-8">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
