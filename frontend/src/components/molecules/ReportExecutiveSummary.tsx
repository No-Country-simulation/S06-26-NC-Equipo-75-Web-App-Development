import React from 'react';
import ReportSectionTitle from '../atoms/ReportSectionTitle';

interface ReportExecutiveSummaryProps {
  period: string;
  companyName: string;
  objective: number;
  achieved: number;
}

const ReportExecutiveSummary: React.FC<ReportExecutiveSummaryProps> = ({
  period,
  companyName,
  objective,
  achieved,
}) => {
  const goalReached = achieved >= objective;
  return (
    <section>
      <ReportSectionTitle title="Resumen Ejecutivo" className="mb-4" />

      <div className="rounded-lg border border-border-light bg-bg-secondary p-6">
        <p className="mb-3 text-body-medium text-text-secondary">
          <span className="font-semibold text-text-primary">Empresa:</span>{' '}
          {companyName}
        </p>

        <p className="mb-6 text-body-medium text-text-secondary">
          <span className="font-semibold text-text-primary">
            Período evaluado:
          </span>{' '}
          {period}
        </p>

        <p className="text-body-large leading-body-large text-text-secondary">
          Durante el <strong>{period}</strong>, <strong>{companyName}</strong>{' '}
          {goalReached ? (
            <>
              superó el objetivo institucional del <strong>{objective}%</strong>{' '}
              en diversidad de candidatos dentro del proceso de selección,
              alcanzando un <strong>{achieved}%</strong>.
            </>
          ) : (
            <>
              alcanzó un <strong>{achieved}%</strong> de diversidad de
              candidatos dentro del proceso de selección, frente al objetivo
              institucional establecido del <strong>{objective}%</strong>.
            </>
          )}{' '}
          Este resultado refleja el desempeño actual del proceso de selección
          auditado por ImpactHire.
        </p>

        <div className="mt-6 flex gap-8">
          <div>
            <p className="text-label-small uppercase tracking-wide text-text-secondary">
              Meta ESG
            </p>

            <p className="text-metric-medium font-bold text-brand-primary">
              {objective}%
            </p>
          </div>

          <div>
            <div>
              <p className="text-label-small uppercase tracking-wide text-text-secondary">
                Resultado
              </p>

              <p
                className={`text-metric-medium font-bold ${
                  goalReached ? 'text-status-success' : 'text-status-warning'
                }`}
              >
                {achieved}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportExecutiveSummary;
