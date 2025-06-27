import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const Dashboard: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [ativos, setAtivos] = useState(0);
  const [cancelados, setCancelados] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [servicos, setServicos] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    const { count: totalCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
    const { count: ativosCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'ativo');
    const { count: canceladosCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'cancelado');
    const { count: clientesCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: servicosCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
    setTotal(totalCount || 0);
    setAtivos(ativosCount || 0);
    setCancelados(canceladosCount || 0);
    setClientes(clientesCount || 0);
    setServicos(servicosCount || 0);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white/80 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8">Dashboard do Administrador</h1>
      {loading ? (
        <div className="flex justify-center items-center text-blue-600 py-8">
          <svg className="animate-spin text-2xl mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          Carregando métricas...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center transition hover:scale-105 focus-within:ring-2 focus-within:ring-blue-400">
            <span className="text-4xl font-bold text-blue-700">{total}</span>
            <span className="mt-2 text-lg">Agendamentos</span>
          </div>
          <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center transition hover:scale-105 focus-within:ring-2 focus-within:ring-green-400">
            <span className="text-4xl font-bold text-green-700">{ativos}</span>
            <span className="mt-2 text-lg">Ativos</span>
          </div>
          <div className="bg-red-100 rounded-xl p-6 shadow flex flex-col items-center transition hover:scale-105 focus-within:ring-2 focus-within:ring-red-400">
            <span className="text-4xl font-bold text-red-700">{cancelados}</span>
            <span className="mt-2 text-lg">Cancelados</span>
          </div>
          <div className="bg-purple-100 rounded-xl p-6 shadow flex flex-col items-center transition hover:scale-105 focus-within:ring-2 focus-within:ring-purple-400">
            <span className="text-4xl font-bold text-purple-700">{clientes}</span>
            <span className="mt-2 text-lg">Clientes</span>
          </div>
          <div className="bg-yellow-100 rounded-xl p-6 shadow flex flex-col items-center transition hover:scale-105 focus-within:ring-2 focus-within:ring-yellow-400">
            <span className="text-4xl font-bold text-yellow-700">{servicos}</span>
            <span className="mt-2 text-lg">Serviços</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 