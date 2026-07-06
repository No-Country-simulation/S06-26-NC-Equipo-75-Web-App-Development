import React from 'react';

const MapaTalento: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-h1 font-bold leading-h1 text-text-primary">
          Mapa de Talento
        </h1>
        <p className="text-body-medium leading-body-medium text-text-secondary">
          Visualiza la distribución de talento en tu organización.
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

export default MapaTalento;
