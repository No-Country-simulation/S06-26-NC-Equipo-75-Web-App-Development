import { type LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  labelIcon?: LucideIcon;
  valueClassName?: string; // ← nuevo: color del valor
}

export default function KpiCard({
  label,
  value,
  icon: Icon,
  labelIcon: LabelIcon,
  valueClassName = 'text-text-primary', // valor por defecto
}: KpiCardProps) {
  return (
    <div className="rounded-2xl bg-bg-primary border border-border-light shadow-sm p-6 flex flex-col gap-4">
      {/* TOP ROW — label + category icon */}
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
            {LabelIcon && (
            <LabelIcon className="h-3.5 w-3.5 text-brand-secondary" />
            )}
            <span className="text-metric-label font-bold leading-label-small text-text-secondary">
            {label}
            </span>
        </div>

        {/* Icono sin fondo ni padding extra */}
        <Icon className="h-5 w-5 text-text-secondary" />
        </div>

      {/* VALUE */}
      <p
        className={`text-display-large leading-metric-label font-bold ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}