import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-bg-primary border border-input-border rounded-lg text-body-medium text-text-primary placeholder:text-input-placeholder focus:border-input-focus outline-none transition-colors"
      />
    </div>
  );
};

export default SearchBar;