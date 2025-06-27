import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';
import toast from 'react-hot-toast';

interface Agendamento {
  id: number;
  user_id: number;
  service_id: number;
  data: string;
  hora: string;
  status: string;
}

const Appointments: React.FC = () => {
  const { token, user } = useAuth();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroData, setFiltroData] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const fetchAgendamentos = async () => {
    setLoading(true);
    try {
      let data = await apiRequest('/appointments', 'GET', undefined, token!);
      if (filtroData) data = data.filter((a: Agendamento) => a.data === filtroData);
      if (filtroStatus) data = data.filter((a: Agendamento) => a.status === filtroStatus);
      setAgendamentos(data);
    } catch (err: any) {
      toast.error('Erro ao carregar agendamentos');
    }
    setLoading(false);
  };

  useEffect(() => { if (token) fetchAgendamentos(); }, [token, filtroData, filtroStatus]);

  const handleStatusChange = async (id: number, novoStatus: string) => {
    setLoading(true);
    try {
      await apiRequest(`/appointments/${id}/status`, 'PATCH', { status: novoStatus }, token!);
      setAgendamentos(ags => ags.map(ag => ag.id === id ? { ...ag, status: novoStatus } : ag));
      toast.success('Status atualizado!');
    } catch (err: any) {
      toast.error('Erro ao atualizar status');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Todos os Agendamentos</h2>
      <div className="flex gap-4 mb-4">
        <input type="date" value={filtroData} onChange={e => setFiltroData(e.target.value)} className="border rounded p-2" />
        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} className="border rounded p-2">
          <option value="">Todos Status</option>
          <option value="pendente">Pendente</option>
          <option value="aprovado">Aprovado</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : agendamentos.length === 0 ? (
        <div>Nenhum agendamento encontrado.</div>
      ) : (
        <ul>
          {agendamentos.map(a => (
            <li key={a.id} className="mb-4 p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div><b>Serviço:</b> {a.service_id}</div>
                <div><b>Data:</b> {a.data} <b>Hora:</b> {a.hora}</div>
                <div><b>Status:</b> {a.status}</div>
                <div><b>Usuário:</b> {a.user_id}</div>
                {user?.role === 'admin' && (
                  <select
                    className="mt-2 border rounded p-1"
                    value={a.status}
                    onChange={e => handleStatusChange(a.id, e.target.value)}
                    disabled={loading}
                  >
                    <option value="pendente">Pendente</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments; 