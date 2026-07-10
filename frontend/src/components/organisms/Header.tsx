import { Bell, HelpCircle, Menu } from 'lucide-react';
import brandLogo from '../../assets/images/brand.svg';
import logoMobile from '../../assets/images/logo.svg'; // ← nuevo archivo

interface HeaderProps {
  title: string;
  userInitials?: string;
  onMenuToggle?: () => void; // ← nuevo: para abrir/cerrar sidebar móvil
}

export default function Header({
  title,
  userInitials = '??',
  onMenuToggle,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center border-b border-border-light bg-bg-primary px-4 md:px-8 py-4 gap-3">
      {/* Hamburguesa (solo móvil) */}
      <button
        className="md:hidden rounded-lg p-2 text-nav-header-icon hover:text-nav-header-hover"
        onClick={onMenuToggle}
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Logo */}
      <div className="shrink-0">
        <img
          src={brandLogo}
          alt="ImpactHire"
          className="hidden md:block h-12 w-auto"
        />
        <img
          src={logoMobile}
          alt="ImpactHire"
          className="md:hidden h-8 w-auto"
        />
      </div>

      {/* Título (centrado) */}
      <div className="flex-1 text-center md:absolute md:left-1/2 md:-translate-x-1/2">
        <h1 className="text-body-large md:text-display-large font-semibold leading-h4 text-text-primary truncate">
          {title}
        </h1>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <button
          aria-label="Notificaciones"
          className="rounded-lg p-2 text-nav-header-icon transition-colors hover:text-nav-header-hover"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          aria-label="Ayuda"
          className="rounded-lg p-2 text-nav-header-icon transition-colors hover:text-nav-header-hover"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-secondary">
          <span className="text-label-small font-semibold leading-label-small text-text-primary">
            {userInitials}
          </span>
        </div>
      </div>
    </header>
  );
}