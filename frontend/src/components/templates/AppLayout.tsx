import React, { useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';
import Footer from '../molecules/Footer';
import { useAuth } from '../../contexts/useAuth';

interface AppLayoutProps {
  children?: React.ReactNode;
}

interface RouteHandle {
  title?: string;
}

function usePageTitle(): string {
  const matches = useMatches();
  const routeWithHandle = matches
    .slice()
    .reverse()
    .find((match) => (match.handle as RouteHandle)?.title);
  return (routeWithHandle?.handle as RouteHandle)?.title ?? 'ImpactHire';
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const pageTitle = usePageTitle();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email
      ? user.email.split('@')[0].substring(0, 2).toUpperCase()
      : '??';

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col">
      <Header title={pageTitle} userInitials={userInitials} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar en escritorio (visible siempre) */}
        <div className="hidden md:block shrink-0 self-stretch">
          <Sidebar />
        </div>

        {/* Sidebar móvil (drawer) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Panel */}
            <div className="absolute left-0 top-0 h-full w-60 bg-bg-dark shadow-xl">
              <Sidebar onItemClick={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {children ?? <Outlet />}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
