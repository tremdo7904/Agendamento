import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const RecuperarSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    // Aqui você pode integrar com backend futuramente
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Recuperar Senha</h2>
        {enviado ? (
          <div className="text-green-600 text-center font-medium">Se o e-mail existir, um link de recuperação foi enviado.</div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Enviar link de recuperação</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecuperarSenha; 