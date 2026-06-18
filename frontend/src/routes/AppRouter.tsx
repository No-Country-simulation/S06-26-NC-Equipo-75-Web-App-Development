import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import RegisterCompany from '../pages/onboarding/Register';
import Dashboard from '../pages/app/Dashboard';
import Vacancies from '../pages/app/Vacancies';

// Componente para rutas protegidas (requiere autenticación)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

// Componente para rutas de onboarding (requiere autenticación y perfil incompleto)
const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

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

  // Si el usuario ya tiene perfil de empresa completo, redirigir al dashboard
  // TODO: Reemplazar con la lógica real cuando esté disponible
  // const hasCompanyProfile = user?.companyProfileCompleted;
  // if (hasCompanyProfile) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Rutas públicas (sin autenticación) */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Ruta de onboarding (requiere autenticación) */}
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
      path="/"
      element={
        <ProtectedRoute>
          <Navigate to="/vacancies" replace />
        </ProtectedRoute>
      }
    />
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

    {/* Catch-all: cualquier ruta no definida redirige a login */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default AppRouter;