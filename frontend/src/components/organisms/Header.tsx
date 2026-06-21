import { Bell, HelpCircle } from 'lucide-react';
import brandLogo from '../../assets/images/brand.svg';

interface HeaderProps {
  title: string;
  userInitials?: string;
}

export default function Header({ title, userInitials = 'RH' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center border-b border-border-light bg-bg-primary px-8 py-4">
      {/* ======================================================
          LOGO
      ====================================================== */}
      <div className="flex w-60 shrink-0 items-center">
        {/* Reemplazá esto con tu <img> del logo si el Header
            va separado del Sidebar, o remové este bloque si
            van juntos en el mismo layout y el logo ya está
            en el Sidebar */}
        <span className="text-h4 font-bold text-text-primary">
          <img src={brandLogo} alt="ImpactHire" className="h-12 w-auto" />
        </span>
      </div>

      {/* ======================================================
          TITLE (centrado absoluto para que no dependa del ancho
          de las columnas laterales)
      ====================================================== */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-display-large font-semibold leading-h4 text-text-primary">
          {title}
        </h1>
      </div>

      {/* ======================================================
          ACTIONS
      ====================================================== */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notificaciones */}
        <button
          aria-label="Notificaciones"
          className="rounded-lg p-2 text-nav-header-icon transition-colors hover:text-nav-header-hover"
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* Ayuda */}
        <button
          aria-label="Ayuda"
          className="rounded-lg p-2 text-nav-header-icon transition-colors hover:text-nav-header-hover"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Avatar con iniciales */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-secondary">
          <span className="text-label-small font-semibold leading-label-small text-text-primary">
            {userInitials}
          </span>
        </div>
      </div>
    </header>
  );
}