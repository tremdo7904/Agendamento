import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute: React.FC<{ allowedRoles: string[]; children: React.ReactNode }> = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  if (!user) return <Navigate to="/auth/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/auth/login" />;
  return <>{children}</>;
};

export default ProtectedRoute; 