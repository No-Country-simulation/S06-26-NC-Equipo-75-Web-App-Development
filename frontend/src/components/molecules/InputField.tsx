import React from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

export interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant={error ? 'error' : 'default'}
        disabled={disabled}
      />
      {error && (
        <p className="text-label-small leading-label-small font-medium text-badge-error-text mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
