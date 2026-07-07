import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SkillsTagsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  error?: string;
}

export default function SkillsTagsInput({
  skills,
  onChange,
  error,
}: SkillsTagsInputProps) {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const sk = input.trim();
    if (!sk) return;
    if (!skills.includes(sk)) {
      onChange([...skills, sk]);
    }
    setInput('');
  };

  const removeSkill = (sk: string) => {
    onChange(skills.filter((s) => s !== sk));
  };

  return (
    <div>
      <label className="block text-label-large font-medium text-input-label mb-1">
        Habilidades requeridas
      </label>

      <div className="relative mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="Ej: Python"
          className="w-full rounded-lg border border-input-border bg-input-bg py-2 pl-3 pr-24 text-body-medium outline-none focus:border-input-focus"
        />
        <button
          type="button"
          onClick={addSkill}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md border border-button-secondary-border px-3 py-1.5 text-label-small font-semibold text-button-secondary-text transition-colors hover:border-brand-secondary hover:text-brand-secondary"
        >
          <Plus className="mr-1 inline-block h-3.5 w-3.5" />
          Agregar
        </button>
      </div>

      {error && (
        <p className="text-badge-error-text text-body-small mb-2">{error}</p>
      )}

      <div className="flex flex-wrap gap-2 min-h-10 p-2 rounded-lg border border-border-light bg-bg-tertiary">
        {skills.length > 0 ? (
          skills.map((sk) => (
            <span
              key={sk}
              className="inline-flex items-center gap-2 rounded-full bg-bg-primary px-3 py-1 text-label-small font-medium shadow-sm"
            >
              {sk}
              <button
                type="button"
                onClick={() => removeSkill(sk)}
                className="text-text-secondary hover:text-badge-error-text"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))
        ) : (
          <p className="text-body-small text-text-secondary px-2">
            No hay habilidades agregadas
          </p>
        )}
      </div>
    </div>
  );
}