import React from 'react';
import { QrCode, ShieldCheck } from 'lucide-react';
import ReportDivider from '../atoms/ReportDivider';

interface ReportFooterProps {
  hash?: string;
  block?: string;
  page?: number;
}

const ReportFooter: React.FC<ReportFooterProps> = ({
  hash = 'a8f9...3b2c',
  block = '84920',
  page = 1,
}) => {
  return (
    <footer className="mt-12">
      <ReportDivider className="mb-6" />

      <div className="flex items-end justify-between">
        {/* Firma */}
        <div className="flex items-center gap-4">
          <div className="rounded-lg border border-border-medium p-2">
            <QrCode size={56} className="text-text-primary" strokeWidth={1.8} />
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <ShieldCheck size={18} className="text-status-success" />

              <p className="text-body-medium font-semibold text-text-primary">
                Firmado Digitalmente
              </p>
            </div>

            <p className="text-body-small text-text-secondary">
              ImpactHire Compliance Dept.
            </p>

            <p className="mt-2 text-body-small text-text-secondary">
              Hash: <span className="font-medium">{hash}</span>
            </p>

            <p className="text-body-small text-text-secondary">
              Block: <span className="font-medium">{block}</span>
            </p>
          </div>
        </div>

        {/* Página */}
        <div className="text-body-small text-text-secondary">Página {page}</div>
      </div>
    </footer>
  );
};

export default ReportFooter;
