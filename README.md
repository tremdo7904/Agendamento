# Agendamento Pro

Sistema completo de agendamento online com frontend React + TypeScript + Tailwind e backend Node.js + Express + SQLite, autenticação por roles (admin/cliente), logs, monitoramento, testes automatizados e CI/CD.

## 🚀 Funcionalidades
- Cadastro, login e recuperação de senha
- Agendamento de serviços com validação de conflitos
- Gestão de serviços e horários (admin)
- Listagem, edição e cancelamento de agendamentos
- Feedback visual (toasts, loaders)
- Responsividade e acessibilidade
- Logs estruturados (Winston/Morgan)
- Monitoramento de erros (Sentry)
- Testes automatizados (Jest, React Testing Library, Supertest)
- CI/CD com GitHub Actions

## 📦 Estrutura de Pastas
```
agendamento-pro/
  backend/           # Backend Node.js/Express/SQLite
    src/
      routes/        # Rotas da API
      middlewares/   # Middlewares de autenticação e autorização
      db.js          # Conexão e migrations do banco
      server.js      # Inicialização do servidor
    .env             # Variáveis de ambiente do backend
  src/               # Frontend React/TypeScript
    components/      # Componentes de UI reutilizáveis
    pages/           # Páginas (login, cadastro, admin, cliente, etc)
    contexts/        # Contextos globais (ex: Auth)
    lib/             # Utilitários (ex: api.js)
  README.md
```

## ⚙️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone <url-do-repo>
cd agendamento-pro
```

### 2. Instale as dependências
```bash
npm install           # Instala dependências do frontend
cd backend && npm install   # Instala dependências do backend
```

### 3. Configure as variáveis de ambiente
- Copie o arquivo `config.env.example` para `.env` na raiz e em `backend/`.
- No backend, configure:
```
PORT=4000
JWT_SECRET=sua_senha_secreta
SENTRY_DSN=<seu_dsn_do_sentry>
```

### 4. Rode o backend
```bash
cd backend
npm start
```

### 5. Rode o frontend
```bash
cd ..
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🧪 Testes Automatizados
- **Frontend:**
  ```bash
  npm test
  ```
- **Backend:**
  ```bash
  cd backend
  npm test
  ```

## 🛡️ Monitoramento de Erros (Sentry)
- Crie uma conta gratuita em https://sentry.io/
- Crie um projeto Node.js e copie o DSN para o `.env` do backend
- Todos os erros não tratados serão enviados automaticamente

## 📑 Documentação da API (exemplo)
- **POST /api/auth/register**: Cadastro de usuário
- **POST /api/auth/login**: Login
- **GET /api/services**: Listar serviços
- **POST /api/services**: Criar serviço (admin)
- **GET /api/appointments**: Listar agendamentos
- **POST /api/appointments**: Criar agendamento
- (Expanda conforme necessário)

## 🤝 Como contribuir
1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push na branch: `git push origin minha-feature`
5. Abra um Pull Request

## 📬 Contato
- Dev: Heitor Lucas
- Email: juniorlucasoxford@gmail.com

---
Projeto desenvolvido com foco em qualidade, segurança, acessibilidade e experiência do usuário.
"# Atualiza��o para deploy" 
