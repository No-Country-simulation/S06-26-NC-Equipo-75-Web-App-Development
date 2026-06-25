import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import RegisterCompany from '../pages/onboarding/Register';
import Dashboard from '../pages/app/Dashboard';
import Vacancies from '../pages/app/Vacancies';
import Home from '../pages/public/Home'; // ← agregado desde develop
import AppLayout from '../components/templates/AppLayout';

// ---------- Layout protegido (con header, sidebar, footer) ----------
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

  return <AppLayout />;
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

  // Onboarding (protegido pero sin AppLayout)
  { path: '/onboarding/company', element: <OnboardingRoute /> },

  // Rutas protegidas con AppLayout
  {
    element: <ProtectedLayout />,
    children: [
      // Redirección del índice del panel (si se accede a /vacancies desde /dashboard, etc.)
      { index: true, element: <Navigate to="/vacancies" replace /> },
      {
        path: 'dashboard',
        element: <Dashboard />,
        handle: { title: 'Dashboard ESG' },
      },
      {
        path: 'vacancies',
        element: <Vacancies />,
        handle: { title: 'Vacantes' },
      },
      // Aquí se agregarán más páginas protegidas
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