import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useMatches,
} from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import RegisterCompany from '../pages/onboarding/Register';
import Dashboard from '../pages/app/Dashboard';
import Vacancies from '../pages/app/Vacancies';
import Candidates from '../pages/app/Candidates';
import Home from '../pages/public/Home';
import CompanyManagement from '../pages/app/CompanyManagement';
import AppLayout from '../components/templates/AppLayout';
import CandidateProfile from '../pages/app/CandidateProfile';

// ---------- Layout protegido (con verificación de roles) ----------
const ProtectedLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const matches = useMatches();

  // Obtenemos el handle de la ruta activa más profunda
  const currentHandle = matches[matches.length - 1]?.handle as
    | { title?: string; roles?: string[] }
    | undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere roles específicos y el usuario no tiene uno de ellos
  if (currentHandle?.roles && user && !currentHandle.roles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
        <div className="text-center">
          <h2 className="text-h2 font-semibold text-text-primary mb-2">
            Acceso Denegado
          </h2>
          <p className="text-body-medium text-text-secondary">
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  return <AppLayout />;
};

// ---------- Ruta de onboarding ----------
const OnboardingRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <RegisterCompany />;
};

// ---------- Data router ----------
const router = createBrowserRouter([
  // Rutas públicas
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/company-management-preview', element: <CompanyManagement /> },

  // Onboarding (protegido pero sin AppLayout)
  { path: '/onboarding/company', element: <OnboardingRoute /> },

  // Rutas protegidas con AppLayout
  {
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Navigate to="/vacancies" replace /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
        handle: { title: 'Dashboard ESG', roles: ['empresa_admin', 'reclutador'] },
      },
      {
        path: 'vacancies',
        element: <Vacancies />,
        handle: { title: 'Vacantes', roles: ['empresa_admin', 'reclutador'] },
      },
      {
        path: 'candidatos',
        element: <Candidates />,
        handle: { title: 'Candidatos', roles: ['empresa_admin', 'reclutador'] },
      },
      {
        path: 'company-management',
        element: <CompanyManagement />,
        handle: { title: 'Gestión de Empresa', roles: ['empresa_admin'] },
      },
      {
        path: 'candidatos/:id',
        element: <CandidateProfile />,
        handle: { title: 'Perfil del Candidato', roles: ['empresa_admin', 'reclutador'] },
      },
    ],
  },

  // Catch-all
  { path: '*', element: <Navigate to="/login" replace /> },
]);

// ---------- Componente principal ----------
const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;