import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';
import toast from 'react-hot-toast';

interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fim: string;
}

const Horarios: React.FC = () => {
  const { token, user } = useAuth();
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [dia, setDia] = useState('segunda');
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFim, setHoraFim] = useState('18:00');
  const [loading, setLoading] = useState(false);

  const fetchHorarios = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/horarios', 'GET', undefined, token!);
      setHorarios(data);
    } catch (err: any) {
      toast.error('Erro ao carregar horários');
    }
    setLoading(false);
  };

  useEffect(() => { if (token) fetchHorarios(); }, [token]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest('/horarios', 'POST', { dia, hora_inicio: horaInicio, hora_fim: horaFim }, token!);
      toast.success('Horário adicionado!');
      setDia('segunda'); setHoraInicio('08:00'); setHoraFim('18:00');
      fetchHorarios();
    } catch (err: any) {
      toast.error('Erro ao adicionar horário');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await apiRequest(`/horarios/${id}`, 'DELETE', undefined, token!);
      toast.success('Horário removido!');
      fetchHorarios();
    } catch (err: any) {
      toast.error('Erro ao remover horário');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Horários Disponíveis</h2>
      {user?.role === 'admin' && (
        <form onSubmit={handleAdd} className="mb-6 flex gap-2 flex-wrap">
          <select value={dia} onChange={e => setDia(e.target.value)} className="border rounded p-2" required>
            <option value="segunda">Segunda</option>
            <option value="terca">Terça</option>
            <option value="quarta">Quarta</option>
            <option value="quinta">Quinta</option>
            <option value="sexta">Sexta</option>
            <option value="sabado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>
          <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="border rounded p-2" required />
          <input type="time" value={horaFim} onChange={e => setHoraFim(e.target.value)} className="border rounded p-2" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>Adicionar</button>
        </form>
      )}
      <ul>
        {horarios.map(h => (
          <li key={h.id} className="flex justify-between items-center border-b py-2">
            <span>{h.dia}: {h.hora_inicio} - {h.hora_fim}</span>
            {user?.role === 'admin' && (
              <button onClick={() => handleDelete(h.id)} className="text-red-600 hover:underline">Remover</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Horarios; 