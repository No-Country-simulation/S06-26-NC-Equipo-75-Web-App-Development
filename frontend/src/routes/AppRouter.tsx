import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import RegisterCompany from '../pages/onboarding/Register';
import Dashboard from '../pages/app/Dashboard';
import Vacancies from '../pages/app/Vacancies';
import Home from '../pages/public/Home';
import CompanyManagement from '../pages/app/CompanyManagement';
import Candidatos from '../pages/app/Candidatos';
import MapaTalento from '../pages/app/MapaTalento';
import GestionUsuarios from '../pages/app/GestionUsuarios';
import ReportesESG from '../pages/app/ReportesESG';
import AppLayout from '../components/templates/AppLayout';

// ---------- Layout protegido ----------
const ProtectedLayout: React.FC = () => {
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

  return <AppLayout><Outlet /></AppLayout>;
};

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return <>{children}</>;
};

// ---------- Ruta de onboarding (autenticado pero sin layout completo) ----------
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

  { path: '/company-management', element: <ProtectedPage><CompanyManagement /></ProtectedPage>, handle: { title: 'Gestión de Empresa' } },

  // Rutas protegidas con AppLayout
  {
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      {
        path: 'app/dashboard',
        element: <Dashboard />,
        handle: { title: 'Dashboard ESG' },
      },
      {
        path: 'app/vacantes',
        element: <Vacancies />,
        handle: { title: 'Vacantes' },
      },
      {
        path: 'app/candidatos',
        element: <Candidatos />,
        handle: { title: 'Candidatos' },
      },
      {
        path: 'app/mapa-talento',
        element: <MapaTalento />,
        handle: { title: 'Mapa de Talento' },
      },
      {
        path: 'app/gestion-empresa',
        element: <CompanyManagement />,
        handle: { title: 'Gestión de Empresa' },
      },
      {
        path: 'app/gestion-usuarios',
        element: <GestionUsuarios />,
        handle: { title: 'Gestión de Usuarios' },
      },
      {
        path: 'app/reportes-esg',
        element: <ReportesESG />,
        handle: { title: 'Reportes ESG' },
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
