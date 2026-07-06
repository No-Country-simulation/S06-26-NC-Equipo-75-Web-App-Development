import React from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';
import Footer from '../molecules/Footer';
import { useAuth } from '../../contexts/useAuth';

interface AppLayoutProps {
  children?: React.ReactNode;
}

// Interfaz para el handle de las rutas
interface RouteHandle {
  title?: string;
}

function usePageTitle(): string {
  const matches = useMatches();
  // Encontramos el último match que tenga handle.title definido
  const routeWithHandle = matches
    .slice()
    .reverse()
    .find((match) => (match.handle as RouteHandle)?.title);
  return (routeWithHandle?.handle as RouteHandle)?.title ?? 'ImpactHire';
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const pageTitle = usePageTitle();

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col">
      <Header title={pageTitle} userInitials={userInitials} />
      <div className="flex flex-1 overflow-hidden">
        <div className="shrink-0 self-stretch">
          <Sidebar />
        </div>
        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {children ?? <Outlet />}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;