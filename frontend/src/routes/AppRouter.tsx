import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/useAuth';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import RegisterCompany from '../pages/onboarding/Register';
import Dashboard from '../pages/app/Dashboard';
import Home from '../pages/public/Home';
import Vacancies from '../pages/app/Vacancies';
import CompanyManagement from '../pages/app/CompanyManagement';

// Componente para rutas protegidas (requiere autenticación)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
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

// Componente para rutas de onboarding (requiere autenticación y perfil incompleto)
const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    {/* Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/company-management-preview" element={<CompanyManagement />} />

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
    <Route
      path="/company-management"
      element={
        <ProtectedRoute>
          <CompanyManagement />
        </ProtectedRoute>
      }
    />

    {/* Catch-all: cualquier ruta no definida redirige a login */}
    <Route path="*" element={<Navigate to="/" replace />} />
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
