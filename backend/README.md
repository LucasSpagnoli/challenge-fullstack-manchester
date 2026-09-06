# Daily.News — Backend

API da plataforma **Daily.News**, usada por assessores de investimentos para gerenciar clientes, filtrar notícias personalizadas com IA e preparar resumos para envio pelo WhatsApp.

---

## Resumo

> Para quem quer saber apenas o necessário para rodar e entender o projeto.

- **Tecnologias:** NestJS 11 + TypeScript + Prisma 7 + PostgreSQL + JWT.
- **Rodar localmente:** `npm install` → configure `.env` → `npx prisma migrate deploy` → `npm run dev` (porta 3000).
- **Estrutura:** módulos de domínio em `src/`, acesso ao banco em `src/database/`, schema e migrations em `prisma/`.
- **Autenticação:** JWT com Passport; endpoints de clientes, preferências e feed exigem token Bearer.
- **Funcionalidades:** CRUD de usuários e clientes; preferências de investimento; coleta de RSS; filtro e resumo das notícias com Gemini; cache de feeds no PostgreSQL.
- **Deploy:** adaptado para Vercel em `api/index.ts`, com configuração em `vercel.json`.

---

## Stack

| Ferramenta | Versão | Descrição |
|---|---:|---|
| NestJS | 11.x | Framework HTTP e arquitetura modular |
| TypeScript | 5.x | Tipagem estática |
| Prisma | 7.x | ORM e migrations |
| PostgreSQL | — | Banco de dados relacional |
| Passport + JWT | 11.x | Autenticação e autorização por token |
| Gemini 2.5 Flash | — | Filtro e resumo inteligente de notícias |

---

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 14+ (ou Docker)
- Chave da API Gemini

### Variáveis de ambiente

Crie o arquivo `.env` a partir de `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/challenge_db"
JWT_SECRET="uma-chave-secreta-segura"
GEMINI_API_KEY="sua-chave-gemini"
ADMIN_SECRET="segredo-para-criar-administradores"
```

### Banco de dados

Para subir um PostgreSQL local com Docker:

```bash
docker compose up -d
```

Em seguida, aplique as migrations e gere o cliente Prisma:

```bash
npx prisma migrate deploy
npx prisma generate
```

### Aplicação

```bash
cd backend
npm install
npm run dev
```

A API estará disponível em `http://localhost:3000`.

### Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia em modo de desenvolvimento com watch |
| `npm run build` | Gera o Prisma Client e compila a aplicação |
| `npm run start:prod` | Executa o build de produção |
| `npm run lint` | Executa o ESLint com correção automática |
| `npm run format` | Formata arquivos TypeScript com Prettier |
| `npm test` | Executa os testes Jest |
| `npm run test:cov` | Executa testes com cobertura |

---

## Estrutura de Pastas

```
src/
├── auth/                  # Login, JWT, strategies, guards e roles
├── clients/               # CRUD de clientes vinculados ao assessor
├── database/              # DatabaseService e integração com Prisma
├── feed/                  # Geração, atualização, cache e resumo de feeds
├── preferences/           # Preferências do assessor e dos clientes
├── services/
│   ├── ai.services.ts     # Integração com Gemini e retentativas em rate limit
│   ├── news.service.ts    # Coleta e parsing dos feeds RSS
│   └── cache.service.ts   # Persistência do cache de notícias
├── users/                 # Gestão de funcionários (admin)
├── types/                 # DTOs e tipos compartilhados
└── utils/                 # Prompts da IA e formatadores
prisma/
├── schema.prisma          # Modelos do banco de dados
└── migrations/            # Histórico de migrations
```

---

## Autenticação e Autorização

- `POST /auth/login` autentica email e senha e retorna um JWT.
- Envie o token nas rotas protegidas: `Authorization: Bearer <token>`.
- `JwtAuthGuard` protege as rotas autenticadas.
- `RolesGuard` restringe operações conforme os papéis `user` e `admin`.
- A criação de administrador usa `POST /auth/admin` e exige `ADMIN_SECRET` no corpo da requisição.

---

## API

| Recurso | Endpoints | Acesso |
|---|---|---|
| Autenticação | `POST /auth/login`, `POST /auth/admin`, `GET /auth/status` | Público; status autenticado |
| Clientes | `GET/POST /clients`, `GET/PATCH/DELETE /clients/:client_id` | `user` ou `admin` |
| Preferências | `GET/PATCH /preferences`, `GET/PATCH /preferences/:client_id` | Autenticado |
| Feed | `GET /feed`, `GET /feed/refresh`, `GET /feed/news` | `user` |
| Feed por cliente | `GET /feed/:client_id`, `GET /feed/refresh/:client_id`, `GET /feed/cache/:client_id`, `GET /feed/summary/:client_id` | `user` |
| Usuários | `GET/POST /users`, `DELETE /users/:id` | `admin` |

Os endpoints de cliente sempre validam se o cliente pertence ao usuário autenticado antes de retornar, alterar ou gerar seu feed.

---

## Funcionalidades Principais

### Clientes e preferências

- Clientes possuem nome, número de WhatsApp e interesses próprios.
- Cada assessor também pode manter preferências de investimento.
- Preferências são listas de termos como `PETR4`, `Ibovespa` e `Taxa Selic`.

### Feed de notícias com IA

- Notícias são coletadas via RSS de **InfoMoney** e **G1 Economia**.
- O Gemini seleciona matérias compatíveis com as preferências do usuário ou cliente.
- O resultado é salvo em cache no PostgreSQL para consultas posteriores.
- O resumo é gerado sob demanda e também armazenado no cache do cliente.
- Chamadas à IA repetem automaticamente em caso de limite de taxa (`429`), com backoff exponencial.

### Administração

- Administradores podem criar, listar e excluir funcionários.
- Rotas administrativas exigem JWT válido com `role === 'admin'`.

---

## Modelos de Dados

| Modelo | Responsabilidade |
|---|---|
| `User` | Assessor ou administrador, credenciais, papel, preferências e clientes |
| `Clients` | Cliente de um assessor, telefone e preferências de notícias |
| `User_cache` | Feed gerado para as preferências do assessor |
| `Client_cache` | Feed e resumo gerados para cada cliente |

---

## CORS e Deploy

Em desenvolvimento, o frontend padrão é `http://localhost:5173`. As origens permitidas em produção são configuradas em `src/main.ts`.

O projeto inclui o handler serverless em `api/index.ts` e `vercel.json` para deploy na Vercel.
