import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';
import toast from 'react-hot-toast';

interface Agendamento {
  id: number;
  service_id: number;
  data: string;
  hora: string;
  status: string;
}

const Agenda: React.FC = () => {
  const { token } = useAuth();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgendamentos = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/appointments', 'GET', undefined, token!);
      setAgendamentos(data);
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchAgendamentos();
    // eslint-disable-next-line
  }, [token]);

  const handleCancel = async (id: number) => {
    setLoading(true);
    try {
      await apiRequest(`/appointments/${id}/cancel`, 'PATCH', undefined, token!);
      setAgendamentos(ags => ags.map(ag => ag.id === id ? { ...ag, status: 'cancelado' } : ag));
      toast.success('Agendamento cancelado!');
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Meus Agendamentos</h2>
      {loading ? (
        <div className="flex justify-center items-center text-blue-600 py-8">
          <svg className="animate-spin text-2xl mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          Carregando...
        </div>
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
              </div>
              {a.status !== 'cancelado' && (
                <button
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleCancel(a.id)}
                  disabled={loading}
                >
                  Cancelar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Agenda; 