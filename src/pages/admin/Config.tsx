import React from 'react';

const AdminConfig: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Configurações do Sistema</h2>
      <form>
        <label className="block mb-2 font-semibold">Nome da Empresa</label>
        <input type="text" className="w-full border rounded p-2 mb-4" placeholder="Digite o nome da empresa" />
        <label className="block mb-2 font-semibold">E-mail de contato</label>
        <input type="email" className="w-full border rounded p-2 mb-4" placeholder="contato@empresa.com" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar</button>
      </form>
    </div>
  );
};

export default AdminConfig; 