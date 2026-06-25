import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import RegisterCompany from '../pages/onboarding/Register';
import Dashboard from '../pages/app/Dashboard';
import Vacancies from '../pages/app/Vacancies';
import AppLayout from '../components/templates/AppLayout';

// ---------- Componente de ruta protegida ----------
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

// ---------- Definición del router con data router ----------
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/onboarding/company',
    element: <RegisterCompany />,
  },
  {
    // Layout protegido para todas las rutas del panel
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/vacancies" replace />,
      },
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
      // acá se agregarán más páginas con handle: { title: '...' }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

// ---------- Componente principal ----------
const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;