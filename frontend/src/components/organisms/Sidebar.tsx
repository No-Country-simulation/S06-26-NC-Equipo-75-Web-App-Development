import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  path?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'vacancies', label: 'Vacantes', icon: Briefcase, path: '/vacancies' },
  { id: 'candidatos', label: 'Candidatos', icon: Users },
  { id: 'mapa-talento', label: 'Mapa de Talento', icon: Map },
  { id: 'indicadores-esg', label: 'Indicadores ESG', icon: PieChart },
  {
    id: 'gestion-empresa',
    label: 'Gestion de Empresa',
    icon: Building2,
    path: '/company-management',
  },
  { id: 'gestion-usuarios', label: 'Gestion de Usuarios', icon: UserCog },
  { id: 'reportes-esg', label: 'Reportes ESG', icon: FileBarChart },
];

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({
  activeItem: initialActiveItem = 'vacancies',
}: SidebarProps) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string>(initialActiveItem);

  return (
    <aside className="flex min-h-screen w-60 self-stretch flex-col bg-bg-dark">
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => {
          const isActive = activeItem === id;

          return (
            <button
              key={id}
              onClick={() => {
                setActiveItem(id);
                if (path) navigate(path);
              }}
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

      <div className="flex flex-col gap-1 border-t border-border-strong px-3 py-4">
        <button
          className="
            flex items-center gap-3 rounded-lg px-3 py-2.5
            text-nav-item font-medium leading-nav-item
            text-nav-sidebar-default transition-colors
            hover:text-nav-sidebar-hover
          "
        >
          <Settings className="h-5 w-5 shrink-0" />
          <span>Configuracion</span>
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
          <span>Cerrar Sesion</span>
        </button>
      </div>
    </aside>
  );
}
