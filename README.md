# Gerenciamento de Alunos — Front-end

Front-end do sistema de gerenciamento de alunos ("LearningLoop"), feito em Vue 3 + TypeScript. Consome a API em [`gerenciamento_alunos_api`](../gerenciamento_alunos_api) (ASP.NET Core), que precisa estar rodando pra a aplicação funcionar de verdade.

## Stack

- [Vue 3](https://vuejs.org/) (Composition API) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build e dev server
- [Vuetify 3](https://vuetifyjs.com/) — componentes de UI
- [Vue Router](https://router.vuejs.org/) — rotas, com guarda de autenticação e de perfil
- [Axios](https://axios-http.com/) — chamadas HTTP
- [Zod](https://zod.dev/) — validação de formulários
- [Vitest](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) — testes automatizados

## Pré-requisitos

- **Node.js `^20.19.0` ou `>=22.12.0`** (exigido pelo Vite 7)
- A [API](../gerenciamento_alunos_api) rodando localmente (por padrão em `https://localhost:7188`) — veja o README dela pra instruções de setup (Liquibase, PostgreSQL, etc.)

## Setup

```bash
npm install
cp .env.example .env
```

O `.env` define a URL da API que o front vai consumir:

```
VITE_API_URL=https://localhost:7188/api
```

Ajuste esse valor se a API estiver rodando em outra porta/host.

## Rodando localmente

```bash
npm run dev
```

Abre em `http://localhost:5173` por padrão. Pra fazer login de verdade, a API precisa estar rodando e ter pelo menos um usuário cadastrado (dá pra criar um pela própria tela de cadastro, `/register`).

## Build de produção

```bash
npm run build   # roda vue-tsc -b (type-check) e depois vite build
npm run preview # serve o build de produção localmente, pra conferir
```

## Testes

```bash
npm run test        # roda a suíte inteira uma vez (vitest run)
npm run test:watch  # modo watch, reroda ao salvar
```

A suíte cobre validações (zod), leitura de token JWT, composables (auth, perfil, alunos) e componentes-chave (`MoleculeForm`, `OrganismProfile`, `OrganismAlunos`), com Vuetify montado via `@vue/test-utils`.

## Autenticação

O login (`POST /Usuario/login`) retorna um JWT, guardado em cookie (`js-cookie`) e enviado em toda requisição autenticada via header `Authorization: Bearer <token>` (interceptor em `src/api/axios.ts`).

O token carrega duas claims usadas pelo front:
- **id do usuário** — claim padrão `sub`.
- **perfil** (`USER`/`ADMIN`) — claim com a URI completa `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role` (não `role`), porque é assim que a API monta o token. Ver `src/services/tokenService.ts`.

Rotas protegidas (`src/router/index.ts`):
- Qualquer rota sob `/` (exceto `/login` e `/register`) exige token válido — sem token ou com token expirado, redireciona pra `/login`.
- `/alunos` exige perfil `ADMIN` — usuário `USER` que tentar acessar direto pela URL é redirecionado pra `/home`, e o item de menu correspondente nem aparece.

Se o token expira (ou a API retorna 401 em qualquer chamada autenticada), o front desloga automaticamente e redireciona pra `/login` (exceto no próprio endpoint de login, pra não interferir na mensagem de credenciais inválidas).

## Funcionalidades

- **Login e cadastro** (`/login`, `/register`)
- **Perfil** (`/perfil`) — visualizar dados, editar nome/email e trocar senha
- **Alunos** (`/alunos`, admin) — listagem com filtro por nome/curso e paginação, cadastro, edição e exclusão (soft delete)

## Estrutura de pastas

```
src/
├── api/              # instância axios (baseURL + interceptors de auth)
├── components/
│   └── atomicDesign/  # atom / molecule / organism (ver convenção abaixo)
├── composables/       # estado + validação de cada form/tela (um por concern)
├── plugins/           # setup do Vuetify
├── router/            # rotas e guardas de navegação
├── services/          # *Service.ts (chamada HTTP pura) e *Handlers.ts (orquestração)
├── test-utils/         # helpers usados só nos testes (ex.: gerar JWT falso)
├── utils/              # schemas de validação (zod), config de inputs, tipos
└── views/              # um componente fino por rota, renderiza um organism
```

### Convenção de camadas (Atomic Design + composable/handler/service)

- **`views/`** — só renderiza um `organism`, sem lógica própria.
- **`atom/`** — elementos burros reutilizáveis (`AtomButton`, `AtomInput`...), geralmente encapsulando um componente Vuetify.
- **`molecule/`** — composição de átomos (`MoleculeForm`, `MoleculeCardInfo`...), ainda sem chamada de API.
- **`organism/`** — dono da lógica de tela; chama os `composables`.
- **`composables/`** — um por form/concern; expõe `ref`s, `rules` de validação, `loading` e `onSubmit`. Nunca chama a API direto.
- **`services/*Handlers.ts`** — orquestra: valida com zod, chama o `service`, controla `loading`, trata erro (`err.response?.data?.mensagem`), dispara sucesso.
- **`services/*Service.ts`** — só a chamada HTTP pura via `api` (axios).
