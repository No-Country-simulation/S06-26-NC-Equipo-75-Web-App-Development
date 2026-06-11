import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importación de páginas (asumiendo que existen o serán creadas)
import Login from '../pages/public/Login';

// Tipado para el manejador de login exitoso
interface AppRouterProps {
  onLoginSuccess?: () => void;
}

const AppRouter: React.FC<AppRouterProps> = ({ onLoginSuccess }) => {
  // Manejador interno para cuando el login es exitoso
  const handleLogin = () => {
    // Guardar estado de autenticación (simulado)
    localStorage.setItem('isAuthenticated', 'true');
    
    // Ejecutar callback si existe
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    
    // Por ahora solo mostramos un mensaje en consola
    console.log('Usuario autenticado correctamente');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Ruta de login */}
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        
        {/* 
          Aquí irán las rutas protegidas cuando las crees:
          - /dashboard
          - /vacantes
          - /candidatos
          - /entrevistas
          - /mensajes
          - /analitica
        */}
        
        {/* Ruta comodín: cualquier otra ruta redirige a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;