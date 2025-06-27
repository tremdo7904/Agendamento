import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-4 py-3 md:px-8">
      <div className="flex items-center gap-2">
        <img src={require('../../logo.svg').default} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg text-blue-700">Agendamento Pro</span>
      </div>
      <div className="flex gap-4">
        {user && user.role === 'admin' && (
          <>
            <Link to="/admin/dashboard" className="text-blue-700 hover:underline">Dashboard</Link>
            <Link to="/admin/services" className="text-blue-700 hover:underline">Serviços</Link>
            <Link to="/admin/appointments" className="text-blue-700 hover:underline">Agendamentos</Link>
          </>
        )}
        {user && user.role === 'client' && (
          <>
            <Link to="/client/agenda" className="text-blue-700 hover:underline">Agenda</Link>
            <Link to="/client/novo-agendamento" className="text-blue-700 hover:underline">Nova Reserva</Link>
            <Link to="/client/perfil" className="text-blue-700 hover:underline">Perfil</Link>
          </>
        )}
        {user ? (
          <button onClick={handleLogout} className="text-blue-700 hover:underline">Sair</button>
        ) : (
          <Link to="/auth/login" className="text-blue-700 hover:underline">Entrar</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 