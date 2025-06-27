import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, { message: 'Senha obrigatória' })
});

const Login: React.FC = () => {
  const { signIn, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }
    const ok = await signIn(email, password);
    if (ok) {
      navigate('/client/agenda');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm"
        aria-label="Formulário de login"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Entrar</h2>
        <Input
          type="email"
          label="E-mail"
          id="login-email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <Input
          type="password"
          label="Senha"
          id="login-password"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {(formError || error) && <div className="text-red-600 mb-2 text-center" role="alert">{formError || error}</div>}
        <Button type="submit" className="w-full mt-2" loading={loading} aria-label="Entrar">
          Entrar
        </Button>
        <div className="text-center mt-4">
          <span>Não tem conta? </span>
          <a href="/auth/register" className="text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors">Cadastre-se</a>
        </div>
        <div className="text-center mt-2">
          <a href="/auth/recuperar" className="text-blue-700 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors">Esqueceu a senha?</a>
        </div>
      </form>
    </main>
  );
};

export default Login; 