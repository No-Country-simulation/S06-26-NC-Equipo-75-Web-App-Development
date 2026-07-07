import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  panelClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const MAX_WIDTH_MAP = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  panelClassName = '',
  maxWidth = 'md',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/60 px-4 backdrop-blur-sm"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={`relative w-full ${MAX_WIDTH_MAP[maxWidth]} rounded-2xl bg-bg-primary shadow-xl ${panelClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con fondo gris claro */}
        {title && (
          <div className="flex items-start justify-between border-b border-border-light px-6 pt-6 pb-4 bg-bg-secondary rounded-t-2xl">
            <div>
              <h2 className="text-h3 font-semibold leading-h3 text-text-primary">
                {title}
              </h2>
              <p className="mt-0.5 text-body-small text-text-secondary">
                Información del puesto
              </p>
            </div>
<button
  onClick={onClose}
  className="rounded-full bg-gray-400 p-1 text-white transition-colors hover:bg-gray-500"
>
  <X className="h-4 w-4" />
</button>
          </div>
        )}

        {/* Body */}
        <div className="flex max-h-[65vh] flex-col gap-5 overflow-y-auto px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}