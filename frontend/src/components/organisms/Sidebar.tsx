import { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Map,
  PieChart,
  Building2,
  UserCog,
  FileBarChart,
  Settings,
  LogOut,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'vacancies', label: 'Vacantes', icon: Briefcase },
  { id: 'candidatos', label: 'Candidatos', icon: Users },
  { id: 'mapa-talento', label: 'Mapa de Talento', icon: Map },
  { id: 'indicadores-esg', label: 'Indicadores ESG', icon: PieChart },
  { id: 'gestion-empresa', label: 'Gestión de Empresa', icon: Building2 },
  { id: 'gestion-usuarios', label: 'Gestión de Usuarios', icon: UserCog },
  { id: 'reportes-esg', label: 'Reportes ESG', icon: FileBarChart },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<string>('vacancies');

  return (
    <aside className="flex h-full w-60 flex-col bg-bg-dark">
      {/* ======================================================
          NAV ITEMS
      ====================================================== */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeItem === id;

          return (
            <button
              key={id}
              onClick={() => setActiveItem(id)}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5
                text-nav-item font-medium leading-nav-item
                transition-colors
                ${
                  isActive
                    ? 'text-nav-sidebar-active'
                    : 'text-nav-sidebar-default hover:text-nav-sidebar-hover'
                }
              `}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* ======================================================
          FOOTER
      ====================================================== */}
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