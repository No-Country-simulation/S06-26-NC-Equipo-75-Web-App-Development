interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className = '' }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-badge font-bold leading-badge ${className}`}>
      {label}
    </span>
  );
}