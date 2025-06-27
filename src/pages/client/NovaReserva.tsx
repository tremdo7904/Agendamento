import React, { useState, useEffect } from 'react';
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

const reservaSchema = z.object({
  serviceId: z.string().min(1, { message: 'Selecione um serviço' }),
  data: z.string().min(1, { message: 'Data obrigatória' }),
  hora: z.string().min(1, { message: 'Hora obrigatória' })
});

const NovaReserva: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiRequest('/services', 'GET', undefined, token!);
        setServices(data);
      } catch (err: any) {
        toast.error('Erro ao carregar serviços');
      }
    };
    if (token) fetchServices();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = reservaSchema.safeParse({ serviceId, data, hora });
    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      await apiRequest('/appointments', 'POST', {
        service_id: Number(serviceId),
        data,
        hora
      }, token!);
      toast.success('Reserva realizada com sucesso!');
      setData('');
      setHora('');
      setServiceId('');
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 sm:p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Nova Reserva</h2>
      <form onSubmit={handleSubmit} aria-label="Formulário de agendamento">
        <div className="mb-4">
          <label htmlFor="reserva-servico" className="block mb-1 font-medium text-gray-700">Serviço</label>
          <select
            id="reserva-servico"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-gray-300"
            value={serviceId}
            onChange={e => setServiceId(e.target.value)}
            required
            aria-label="Serviço"
          >
            <option value="">Selecione...</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <Input
          type="date"
          label="Data"
          id="reserva-data"
          value={data}
          onChange={e => setData(e.target.value)}
          required
        />
        <Input
          type="time"
          label="Hora"
          id="reserva-hora"
          value={hora}
          onChange={e => setHora(e.target.value)}
          required
        />
        {formError && <div className="text-red-600 mb-2 text-center" role="alert">{formError}</div>}
        <Button type="submit" className="w-full mt-2" loading={loading} aria-label="Agendar">
          Agendar
        </Button>
      </form>
    </main>
  );
};

export default NovaReserva; 