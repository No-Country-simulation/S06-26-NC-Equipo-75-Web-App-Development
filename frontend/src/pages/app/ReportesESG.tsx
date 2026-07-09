import React from 'react';

const ReportesESG: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-bold leading-h1 text-text-primary">
          Reportes ESG
        </h1>
        <p className="text-body-medium leading-body-medium text-text-secondary">
          Consulta y descarga reportes sobre el cumplimiento de tus objetivos
          ESG.
        </p>
      </header>

      <div className="rounded-lg border border-border-light bg-bg-primary p-6">
        <p className="text-body-medium leading-body-medium text-text-secondary">
          Esta sección está en desarrollo.
        </p>
      </div>
    </div>
  );
};

export default ReportesESG;
