# 🔐 Configuração do Sistema de Autenticação

## 📋 **Variáveis de Ambiente Necessárias**

Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:

```env
# Configuração do Banco de Dados
DATABASE_URL="postgresql://usuario:senha@host:porta/database"

# Configuração JWT (IMPORTANTE: Use uma chave segura em produção)
JWT_SECRET="sua-chave-secreta-jwt-aqui"

# Configuração da Aplicação
PORT=3001
NODE_ENV=development
```

## 🚀 **Como Usar o Sistema de Autenticação**

### **1. Endpoints Disponíveis:**

#### **POST /auth/register**
Registrar novo usuário:
```json
{
  "email": "usuario@exemplo.com",
  "usuario": "nomeusuario",
  "password": "senha123",
  "cooperativaId": 1
}
```

#### **POST /auth/login**
Fazer login:
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

#### **GET /auth/profile**
Obter perfil do usuário (requer token JWT)

#### **GET /auth/tanques**
Obter tanques do usuário (requer token JWT)

### **2. Como o Sistema Funciona:**

1. **Registro:** Usuário cria conta com email único
2. **Login:** Sistema valida credenciais e retorna JWT token
3. **Proteção:** Todas as rotas protegidas verificam o token JWT
4. **Isolamento:** Cada usuário só vê seus próprios tanques e dados
5. **Sessão:** Token salvo no localStorage com interceptors automáticos

### **3. Estrutura do Token JWT:**

```json
{
  "email": "usuario@exemplo.com",
  "sub": 1,
  "cooperativa": 1,
  "usuario": "nomeusuario",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### **4. Rotas Protegidas:**

- `/dashboard` - Dashboard do usuário
- `/tanque` - Gestão de tanques
- `/biometria-diaria` - Biometrias diárias
- `/biometria-semanal` - Biometrias semanais

### **5. Frontend:**

O frontend já está configurado para:
- ✅ Fazer login/registro automaticamente
- ✅ Incluir token JWT em todas as requisições
- ✅ Redirecionar para login se token expirar
- ✅ Mostrar apenas dados do usuário logado

## 🔧 **Configuração para Produção:**

1. **JWT_SECRET:** Use uma chave forte e única
2. **DATABASE_URL:** Configure conexão segura com SSL
3. **NODE_ENV:** Defina como "production"
4. **HTTPS:** Configure certificados SSL

## 📝 **Exemplo de Uso:**

```typescript
// Frontend - Login
const response = await fetch('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { access_token, user } = await response.json();

// Salvar token
localStorage.setItem('authToken', access_token);

// Usar em requisições
fetch('/dashboard', {
  headers: { 'Authorization': `Bearer ${access_token}` }
});
```

## 🛡️ **Segurança:**

- ✅ Senhas são hasheadas com bcrypt
- ✅ Tokens JWT com expiração
- ✅ Validação de dados com class-validator
- ✅ Isolamento de dados por usuário
- ✅ Interceptors automáticos no frontend
