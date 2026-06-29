import { useCallback, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Map,
  Building2,
  UserCog,
  FileBarChart,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';

// --------------------------------------------------
// 1. Roles reales del sistema
// --------------------------------------------------
type Rol = 'empresa_admin' | 'reclutador';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  to: string;
  roles: Rol[];
}

const ALL_NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard ESG',
    icon: LayoutDashboard,
    to: '/app/dashboard',
    roles: ['empresa_admin', 'reclutador'],
  },
  {
    id: 'vacancies',
    label: 'Vacantes',
    icon: Briefcase,
    to: '/app/vacantes',
    roles: ['empresa_admin', 'reclutador'],
  },
  {
    id: 'candidatos',
    label: 'Candidatos',
    icon: Users,
    to: '/app/candidatos',
    roles: ['empresa_admin', 'reclutador'],
  },
  {
    id: 'mapa-talento',
    label: 'Mapa de Talento',
    icon: Map,
    to: '/app/mapa-talento',
    roles: ['empresa_admin', 'reclutador'],
  },
  {
    id: 'gestion-empresa',
    label: 'Gestión de Empresa',
    icon: Building2,
    to: '/app/gestion-empresa',
    roles: ['empresa_admin'],
  },
  {
    id: 'gestion-usuarios',
    label: 'Gestión de Usuarios',
    icon: UserCog,
    to: '/app/gestion-usuarios',
    roles: ['empresa_admin'],
  },
  {
    id: 'reportes-esg',
    label: 'Reportes ESG',
    icon: FileBarChart,
    to: '/app/reportes-esg',
    roles: ['empresa_admin'],
  },
];

// --------------------------------------------------
// 2. Componente Sidebar
// --------------------------------------------------
export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userRole = (user?.role as Rol) ?? null;

  const visibleItems = useMemo(
    () =>
      userRole
        ? ALL_NAV_ITEMS.filter((item) => item.roles.includes(userRole))
        : [],
    [userRole],
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  return (
    <aside className="flex h-full w-60 flex-col bg-bg-dark">
      {/* Navegación principal */}
      <nav className="flex flex-1 flex-col gap-1 px-3 pt-16 pb-4 overflow-y-auto">
        {visibleItems.map(({ id, label, icon: Icon, to }) => (
          <NavLink
            key={id}
            to={to}
            end={to === '/app/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5
              text-nav-item font-medium leading-nav-item
              transition-colors ${
                isActive
                  ? 'text-nav-sidebar-hover'
                  : 'text-nav-sidebar-default hover:text-nav-sidebar-hover'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-1 border-t border-border-strong px-3 py-4 shrink-0">
        <button
          className="
            flex items-center gap-3 rounded-lg px-3 py-2.5
            text-nav-item font-medium leading-nav-item
            text-nav-sidebar-default transition-colors
            hover:text-nav-sidebar-hover
          "
        >
          <Settings className="h-5 w-5 shrink-0" />
          <span>Configuración</span>
        </button>

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 rounded-lg px-3 py-2.5
            text-nav-item font-medium leading-nav-item
            text-nav-sidebar-default transition-colors
            hover:text-nav-sidebar-hover
          "
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}