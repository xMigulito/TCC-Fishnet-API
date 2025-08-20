# Instruções de Instalação - Backend FishNet

## Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Configuração do Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/fishnet_db"

# Porta do servidor (opcional, padrão: 3001)
PORT=3001

# Configurações do Prisma
PRISMA_GENERATE_DATAPROXY=true
```

**Substitua:**
- `usuario`: seu usuário do PostgreSQL
- `senha`: sua senha do PostgreSQL
- `localhost`: endereço do seu servidor PostgreSQL
- `5432`: porta do PostgreSQL (padrão: 5432)
- `fishnet_db`: nome do banco de dados

### 3. Criar Banco de Dados

```sql
CREATE DATABASE fishnet_db;
```

### 4. Executar Migrações

```bash
npx prisma migrate dev
```

### 5. Gerar Cliente Prisma

```bash
npx prisma generate
```

## Execução

### Desenvolvimento

```bash
npm run start:dev
```

O servidor estará disponível em: `http://localhost:3001`

### Produção

```bash
npm run build
npm run start:prod
```

## Endpoints Disponíveis

### Tanques
- `GET /tanque` - Listar todos os tanques
- `GET /tanque/resumo` - Resumo dos tanques com métricas
- `POST /tanque` - Criar novo tanque
- `GET /tanque/:id` - Buscar tanque por ID
- `PATCH /tanque/:id` - Atualizar tanque
- `DELETE /tanque/:id` - Deletar tanque

### Alojamentos
- `GET /tanque-alojamento` - Listar todos os alojamentos
- `GET /tanque-alojamento/tanque/:tanqueId` - Buscar alojamentos por tanque
- `POST /tanque-alojamento` - Criar novo alojamento
- `GET /tanque-alojamento/:id` - Buscar alojamento por ID
- `PATCH /tanque-alojamento/:id` - Atualizar alojamento
- `DELETE /tanque-alojamento/:id` - Deletar alojamento

### Biometrias Diárias
- `GET /biometria-diaria` - Listar todas as biometrias diárias
- `POST /biometria-diaria` - Criar nova biometria diária
- `GET /biometria-diaria/:id` - Buscar biometria diária por ID
- `PATCH /biometria-diaria/:id` - Atualizar biometria diária
- `DELETE /biometria-diaria/:id` - Deletar biometria diária

### Biometrias Semanais
- `GET /biometria-semanal` - Listar todas as biometrias semanais
- `POST /biometria-semanal` - Criar nova biometria semanal
- `GET /biometria-semanal/:id` - Buscar biometria semanal por ID
- `PATCH /biometria-semanal/:id` - Atualizar biometria semanal
- `DELETE /biometria-semanal/:id` - Deletar biometria semanal

### Dashboard
- `GET /dashboard` - Dados do dashboard

## Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas principais:

- **Tanque**: Informações dos tanques
- **TanqueAlojamento**: Alojamentos de peixes nos tanques
- **BiometriaDiaria**: Medições diárias
- **BiometriaSemanal**: Medições semanais
- **UsuarioSIS**: Usuários do sistema
- **Cooperativa**: Cooperativas
- **TanqueUser**: Relacionamento entre usuários e tanques

## Solução de Problemas

### Erro de Conexão com Banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Teste a conexão: `psql -h localhost -U usuario -d fishnet_db`

### Erro de Migração
- Verifique se o banco existe
- Execute: `npx prisma db push` para forçar a sincronização

### Erro de CORS
- O CORS já está habilitado no `main.ts`
- Verifique se o frontend está acessando a URL correta

## Logs

Os logs do servidor aparecem no console. Para desenvolvimento, use:

```bash
npm run start:debug
```



