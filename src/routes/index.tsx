import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Páginas (lazy loading)
const Login = React.lazy(() => import('../pages/auth/Login'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const RecuperarSenha = React.lazy(() => import('../pages/auth/RecuperarSenha'));
const Dashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const AdminConfig = React.lazy(() => import('../pages/admin/Config'));
const Services = React.lazy(() => import('../pages/admin/Services'));
const Horarios = React.lazy(() => import('../pages/admin/Horarios'));
const Appointments = React.lazy(() => import('../pages/admin/Appointments'));
const Agenda = React.lazy(() => import('../pages/client/Agenda'));
const NovaReserva = React.lazy(() => import('../pages/client/NovaReserva'));
const Perfil = React.lazy(() => import('../pages/client/Perfil'));

const AppRoutes = () => (
  <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Carregando...</div>}>
    <Routes>
      {/* Rotas públicas */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/recuperar" element={<RecuperarSenha />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/config" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminConfig />
        </ProtectedRoute>
      } />
      <Route path="/admin/services" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Services />
        </ProtectedRoute>
      } />
      <Route path="/admin/horarios" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Horarios />
        </ProtectedRoute>
      } />
      <Route path="/admin/appointments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Appointments />
        </ProtectedRoute>
      } />

      {/* Cliente */}
      <Route path="/client/agenda" element={
        <ProtectedRoute allowedRoles={['client']}>
          <Agenda />
        </ProtectedRoute>
      } />
      <Route path="/client/novo-agendamento" element={
        <ProtectedRoute allowedRoles={['client']}>
          <NovaReserva />
        </ProtectedRoute>
      } />
      <Route path="/client/perfil" element={
        <ProtectedRoute allowedRoles={['client']}>
          <Perfil />
        </ProtectedRoute>
      } />

      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  </React.Suspense>
);

export default AppRoutes; 