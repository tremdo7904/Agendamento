import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  role: z.enum(['admin', 'client'], { errorMap: () => ({ message: 'Tipo de usuário inválido' }) })
});

const Register: React.FC = () => {
  const { signUp, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'client'>('client');
  const [formError, setFormError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = registerSchema.safeParse({ email, password, role });
    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }
    setLocalLoading(true);
    await signUp(email, password, role);
    setLocalLoading(false);
    navigate('/auth/login');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm"
        aria-label="Formulário de cadastro"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Cadastro</h2>
        <Input
          type="email"
          label="E-mail"
          id="register-email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <Input
          type="password"
          label="Senha"
          id="register-password"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <div className="mb-4">
          <label htmlFor="register-role" className="block mb-1 font-medium text-gray-700">Tipo de usuário</label>
          <select
            id="register-role"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-gray-300"
            value={role}
            onChange={e => setRole(e.target.value as 'admin' | 'client')}
            required
            aria-label="Tipo de usuário"
          >
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {(formError || error) && <div className="text-red-600 mb-2 text-center" role="alert">{formError || error}</div>}
        <Button type="submit" className="w-full mt-2" loading={localLoading} aria-label="Cadastrar">
          Cadastrar
        </Button>
        <div className="text-center mt-4">
          <span>Já tem conta? </span>
          <a href="/auth/login" className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors">Entrar</a>
        </div>
      </form>
    </main>
  );
};

export default Register; 