import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: CustomSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-input-border bg-input-bg p-3 pr-10 text-body-medium text-text-primary outline-none focus:border-input-focus"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="rounded-full bg-gray-400 p-0.5 text-white">
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}