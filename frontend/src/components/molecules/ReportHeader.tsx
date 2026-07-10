import React from 'react';
import logo from '../../assets/images/logo.svg';

interface ReportHeaderProps {
  companyName: string;
  reportTitle?: string;
  generatedAt: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  companyName,
  reportTitle = 'Reporte ESG - Diversidad',
  generatedAt,
}) => {
  return (
    <header className="flex items-start justify-between">
      {/* Información del reporte */}
      <div>
        <h1 className="text-h1 leading-h1 font-bold text-text-primary">
          {reportTitle}
        </h1>

        <p className="mt-2 text-body-large font-semibold text-text-secondary">
          {companyName}
        </p>
      </div>

      {/* Logo + fecha */}
      <div className="flex flex-col items-end">
        <img src={logo} alt="ImpactHire" className="h-12 object-contain" />

        <p className="mt-2 text-body-small text-text-secondary">
          Generado: {generatedAt}
        </p>
      </div>
    </header>
  );
};

export default ReportHeader;
