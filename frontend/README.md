# Manchester.News — Frontend

Interface web da plataforma **Manchester.News**, ferramenta para assessores de investimentos gerenciarem clientes e enviarem resumos de notícias personalizados via WhatsApp.

---

## Resumo

> Para quem quer saber apenas o necessário para rodar e entender o projeto.

- **Tecnologias:** React 19 + TypeScript + Vite + Tailwind CSS 4 + React Router 7.
- **Rodar localmente:** `npm install` → crie `.env` com `VITE_API_URL=http://localhost:3000` → `npm run dev` (porta 5173).
- **Estrutura:** páginas em `src/Pages/`, componentes em `src/components/`, camada de API em `src/api/` (hooks em `lib/`, tipos em `types/`), guards de rota em `src/routes/`.
- **Rotas:** `/` (login, pública), `/clients` (gerenciar clientes), `/feed` (feed de notícias), `/admin` (painel admin — acesso restrito).
- **Funcionalidades:** CRUD de clientes com preferências de notícias inline; feed de notícias gerado sob demanda por IA; envio de resumo ou notícia individual via WhatsApp (`wa.me`).
- **API:** toda requisição passa por `apiFetch<T>` com token JWT injetado automaticamente. Token salvo em `sessionStorage`.

---

## Stack

| Ferramenta       | Versão | Descrição                            |
|------------------|--------|--------------------------------------|
| React            | 19.x   | Biblioteca de UI                     |
| TypeScript       | ~6.0   | Tipagem estática                     |
| Vite             | 8.x    | Bundler e servidor de desenvolvimento|
| React Router DOM | 7.x    | Roteamento client-side (SPA)         |
| Tailwind CSS     | 4.x    | Estilização utilitária               |

---

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm 9+

### Passos

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Scripts

| Script            | Descrição                             |
|-------------------|---------------------------------------|
| `npm run dev`     | Inicia o servidor de desenvolvimento  |
| `npm run build`   | Gera o bundle de produção             |
| `npm run preview` | Serve o bundle de produção localmente |
| `npm run lint`    | Executa o ESLint                      |

---

> Todas as variáveis expostas ao navegador precisam do prefixo `VITE_`.

---

## Estrutura de Pastas

```
src/
├── Pages/                  # Páginas da aplicação
│   ├── LoginPage.tsx       # Login e cadastro de usuário
│   ├── ClientPage.tsx      # Listagem e gerenciamento de clientes
│   ├── FeedPage.tsx        # Feed de notícias em carrossel horizontal
│   └── AdminPage.tsx       # Gerenciamento de funcionários (admin)
├── components/             # Componentes reutilizáveis
│   ├── Header.tsx          # Barra de navegação global
│   ├── ClientCard.tsx      # Card de cliente com preferências inline
│   ├── ClientSection.tsx   # Coluna do feed de um cliente
│   ├── ClientNews.tsx      # Lista de notícias de um cliente
│   ├── ClientModal.tsx     # Modal criar/editar cliente
│   ├── UserModal.tsx       # Modal criar funcionário (admin)
│   └── ConfrmModal.tsx     # Modal de confirmação de exclusão
├── api/
│   ├── apiClient.ts        # Cliente HTTP genérico com Bearer token
│   ├── accessToken.ts      # Token JWT no sessionStorage
│   ├── auth.ts             # Login, registro e logout
│   ├── clients.ts          # CRUD de clientes
│   ├── feed.ts             # Feed: cache, refresh e resumo
│   ├── preferences.ts      # Preferências de cliente/usuário
│   ├── users.ts            # CRUD de usuários (admin)
│   ├── lib/                # Custom hooks e AuthContext
│   └── types/              # Interfaces TypeScript
├── routes/
│   └── guards.tsx          # RequireAuth, RequireAdmin, RedirectIfAuth
└── utils/                  # Funções utilitárias
```

---

## Páginas e Rotas

| Rota       | Página     | Acesso          |
|------------|------------|-----------------|
| `/`        | LoginPage  | Pública         |
| `/clients` | ClientPage | Autenticado     |
| `/feed`    | FeedPage   | Autenticado     |
| `/admin`   | AdminPage  | Somente `admin` |

O acesso é controlado por **route guards** em `src/routes/guards.tsx`:

- **`RequireAuth`** — redireciona para `/` se não autenticado.
- **`RequireAdmin`** — redireciona para `/clients` se não for admin.
- **`RedirectIfAuth`** — redireciona usuários já logados para `/admin` ou `/clients` ao acessar `/`.

---

## Funcionalidades Principais

### Autenticação
- Login e cadastro na mesma tela com toggle entre os modos.
- Token JWT armazenado em `sessionStorage` (expira ao fechar a aba).
- Sessão restaurada automaticamente via decodificação do JWT local, sem nova requisição ao backend.

### Gerenciamento de Clientes (`/clients`)
- CRUD completo de clientes (nome e número de WhatsApp).
- Preferências de notícias (interesses) gerenciadas por cliente inline no card — ex.: `PETR4`, `Ibovespa`, `Taxa Selic`.
- Validação e normalização automática do número de celular (injeta nono dígito, remove DDI duplicado).
- Skeleton loading animado e animação de entrada staggerada por card.

### Feed de Notícias (`/feed`)
- Carrossel horizontal com `snap-x snap-mandatory` exibindo um feed por cliente.
- O feed é **gerado sob demanda** (botão "Gerar Feed") para preservar tokens da API de IA.
- Ao abrir a página, busca o **cache** do último feed gerado.

### Envio via WhatsApp
- **Resumo do feed:** gera um resumo inteligente via IA e abre `wa.me` com a mensagem pré-preenchida.
- **Notícia individual:** envia título + link de uma matéria específica diretamente para o WhatsApp do cliente.
- Se o feed estiver vazio, a aplicação gera automaticamente antes de criar o resumo.

### Painel Admin (`/admin`)
- Listagem, criação e exclusão de funcionários do sistema.
- Visível apenas para usuários com `role === 'admin'`.

---

## API

Toda comunicação com o backend passa por `apiFetch<T>` em `src/api/apiClient.ts`, que injeta automaticamente o token JWT e trata erros HTTP com a classe `ApiError`.

| Módulo           | Endpoints                                                                 |
|------------------|---------------------------------------------------------------------------|
| `auth.ts`        | `POST /auth/register`, `POST /auth/login`                                 |
| `clients.ts`     | `GET/POST /clients`, `GET/PATCH/DELETE /clients/:id`                      |
| `feed.ts`        | `GET /feed/cache/:id`, `GET /feed/refresh/:id`, `GET /feed/summary/:id`   |
| `preferences.ts` | `GET/PATCH /preferences`, `GET/PATCH /preferences/:id`                    |
| `users.ts`       | `GET/POST /users`, `DELETE /users/:id`                                    |

---
