import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiRequest } from '../../lib/api';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { z } from 'zod';

interface Service {
  id: number;
  name: string;
  duration: number;
}

const serviceSchema = z.object({
  nome: z.string().min(2, { message: 'Nome obrigatório' }),
  duracao: z.number().int().min(1, { message: 'Duração deve ser maior que zero' })
});

const Services: React.FC = () => {
  const { token, user } = useAuth();
  const [servicos, setServicos] = useState<Service[]>([]);
  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState(30);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchServicos = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/services', 'GET', undefined, token!);
      setServicos(data);
    } catch (err: any) {
      toast.error('Erro ao carregar serviços');
    }
    setLoading(false);
  };

  useEffect(() => { if (token) fetchServicos(); }, [token]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = serviceSchema.safeParse({ nome, duracao });
    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      await apiRequest('/services', 'POST', { name: nome, duration: duracao }, token!);
      setNome(''); setDuracao(30);
      toast.success('Serviço adicionado!');
      fetchServicos();
    } catch (err: any) {
      toast.error('Erro ao adicionar serviço');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await apiRequest(`/services/${id}`, 'DELETE', undefined, token!);
      toast.success('Serviço removido!');
      fetchServicos();
    } catch (err: any) {
      toast.error('Erro ao remover serviço');
    }
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-4 sm:p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Serviços</h2>
      {user?.role === 'admin' && (
        <form onSubmit={handleAdd} className="mb-6 flex gap-2 flex-wrap" aria-label="Formulário de serviço">
          <Input
            type="text"
            label="Nome do serviço"
            id="servico-nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            className="flex-1"
            autoComplete="off"
          />
          <Input
            type="number"
            label="Duração (min)"
            id="servico-duracao"
            value={duracao}
            onChange={e => setDuracao(Number(e.target.value))}
            min={1}
            required
            className="w-32"
            autoComplete="off"
          />
          {formError && <div className="text-red-600 mb-2 text-center w-full" role="alert">{formError}</div>}
          <Button type="submit" loading={loading} aria-label="Adicionar serviço">Adicionar</Button>
        </form>
      )}
      <ul>
        {servicos.map(s => (
          <li key={s.id} className="flex justify-between items-center border-b py-2">
            <span>{s.name} ({s.duration} min)</span>
            {user?.role === 'admin' && (
              <Button variant="danger" onClick={() => handleDelete(s.id)} loading={loading} aria-label={`Remover serviço ${s.name}`}>
                Remover
              </Button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Services; 