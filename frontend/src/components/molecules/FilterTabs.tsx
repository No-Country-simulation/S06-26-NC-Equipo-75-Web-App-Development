import React from 'react';

interface FilterTabsProps<T extends string> {
  options: readonly T[];
  selected: T;
  onChange: (value: T) => void;
}

function FilterTabs<T extends string>({
  options,
  selected,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-1.5 rounded-full text-badge font-bold transition-colors ${
            selected === option
              ? 'bg-brand-secondary text-white'
              : 'bg-bg-primary border border-border-light text-text-secondary hover:border-border-medium'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;