import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import RegisterCompany from '../pages/onboarding/Register';
import Dashboard from '../pages/app/Dashboard';
import Home from '../pages/public/Home';
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

// Componente para rutas de onboarding (requiere autenticación y perfil incompleto)
const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Ruta de onboarding (protegida) */}
    <Route
      path="/onboarding/company"
      element={
        <OnboardingRoute>
          <RegisterCompany />
        </OnboardingRoute>
      }
    />

    {/* Rutas protegidas del panel */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/vacancies"
      element={
        <ProtectedRoute>
          <Vacancies />
        </ProtectedRoute>
      }
    />

    {/* Catch-all: redirige a home */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

// ---------- Componente principal ----------
const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;