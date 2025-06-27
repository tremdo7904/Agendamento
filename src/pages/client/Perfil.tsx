import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Perfil: React.FC = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email });
    setLoading(false);
    if (error) toast.error('Erro ao atualizar e-mail: ' + error.message);
    else toast.success('E-mail atualizado!');
  };

  const handleSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    setLoading(false);
    if (error) toast.error('Erro ao atualizar senha: ' + error.message);
    else toast.success('Senha atualizada!');
    setSenhaAtual('');
    setNovaSenha('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>
      <div className="mb-6">
        <b>E-mail atual:</b> {user?.email}
      </div>
      <form onSubmit={handleEmail} className="mb-6">
        <Input
          type="email"
          label="Novo e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" loading={loading}>Atualizar e-mail</Button>
      </form>
      <form onSubmit={handleSenha}>
        <Input
          type="password"
          label="Nova senha"
          value={novaSenha}
          onChange={e => setNovaSenha(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" loading={loading}>Atualizar senha</Button>
      </form>
    </div>
  );
};

export default Perfil; 