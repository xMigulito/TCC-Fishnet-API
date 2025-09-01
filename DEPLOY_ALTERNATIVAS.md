# 🚀 Deploy FishNet API - Alternativas Gratuitas

## 🚨 **Problema com Railway**
O Railway na versão gratuita **só permite banco de dados**, não permite deploy de aplicações backend.

## 🟢 **Render (Recomendado - Mais Simples)**

### **Vantagens:**
- ✅ **Backend + Banco**: Ambos gratuitos
- ✅ **Deploy automático**: Via GitHub
- ✅ **Interface simples**: Fácil de configurar
- ✅ **PostgreSQL**: Banco completo
- ✅ **SSL**: HTTPS automático

### **Limitações Gratuitas:**
- Backend: 750 horas/mês (dorme após 15 min)
- Banco: 1GB de dados
- Build: 500 min/mês

### **Passos para Deploy:**

#### **1. Preparar o Repositório**
```bash
git add .
git commit -m "Add: Render deployment configuration"
git push origin main
```

#### **2. Deploy no Render**
1. **Acesse**: [render.com](https://render.com)
2. **Faça login** com GitHub
3. **Clique**: "New +" → "Blueprint"
4. **Conecte** o repositório `TCC-Fishnet-API`
5. **Render detectará** o `render.yaml` automaticamente
6. **Clique**: "Apply"

#### **3. Configurações Automáticas**
- ✅ Backend criado automaticamente
- ✅ Banco PostgreSQL criado automaticamente
- ✅ Variáveis de ambiente configuradas
- ✅ Deploy automático ativado

#### **4. URLs Geradas**
- **Backend**: `https://fishnet-api.onrender.com`
- **Banco**: PostgreSQL interno (conectado automaticamente)

---

## 🟡 **Fly.io (Alternativa - Melhor Performance)**

### **Vantagens:**
- ✅ **Performance superior**: Sem sleep
- ✅ **3 VMs gratuitas**: Sempre ativo
- ✅ **Global**: CDN mundial
- ✅ **CLI**: Controle via terminal

### **Limitações Gratuitas:**
- 3 VMs com 256MB RAM cada
- 3GB de armazenamento
- 160GB transferência/mês

### **Passos para Deploy:**

#### **1. Instalar Fly CLI**
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# macOS/Linux
curl -L https://fly.io/install.sh | sh
```

#### **2. Login no Fly**
```bash
fly auth login
```

#### **3. Deploy da Aplicação**
```bash
# Na pasta do projeto
fly launch

# Responda as perguntas:
# - App name: fishnet-api
# - Region: gru (São Paulo)
# - Database: Yes, PostgreSQL
# - Scale: 0 (gratuito)
```

#### **4. Configurar Banco**
```bash
# Criar banco PostgreSQL
fly postgres create

# Conectar banco à app
fly postgres attach <database-name>
```

#### **5. Deploy**
```bash
fly deploy
```

---

## 🟠 **Supabase (Alternativa - Backend Automático)**

### **Vantagens:**
- ✅ **Banco completo**: PostgreSQL + API automática
- ✅ **Auth**: Sistema de autenticação
- ✅ **Real-time**: WebSockets automáticos
- ✅ **Dashboard**: Interface web completa

### **Limitações Gratuitas:**
- 500MB de dados
- 50MB de transferência/dia
- 2 projetos

### **Como Usar:**
1. **Acesse**: [supabase.com](https://supabase.com)
2. **Crie projeto** gratuito
3. **Configure** o schema do Prisma
4. **Use** a API automática gerada

---

## 📋 **Configurações Necessárias**

### **1. Variáveis de Ambiente**
```env
# Produção
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
PORT=10000

# Prisma
PRISMA_GENERATE_DATAPROXY=true
```

### **2. Scripts de Build**
```json
{
  "scripts": {
    "build": "nest build",
    "start:prod": "node dist/main",
    "db:generate": "prisma generate",
    "db:push": "prisma db push"
  }
}
```

### **3. Health Check**
```typescript
@Get('health')
getHealth() {
  return { status: 'ok', timestamp: new Date().toISOString() };
}
```

---

## 🎯 **Recomendação Final**

### **Para Iniciantes: Render**
- ✅ Mais simples de configurar
- ✅ Interface web intuitiva
- ✅ Deploy automático
- ✅ Documentação clara

### **Para Avançados: Fly.io**
- ✅ Melhor performance
- ✅ Sem sleep
- ✅ Controle total
- ✅ CLI poderoso

### **Para Prototipagem: Supabase**
- ✅ Backend automático
- ✅ Auth pronto
- ✅ Real-time
- ✅ Dashboard completo

---

## 🚀 **Próximos Passos**

### **1. Escolha uma plataforma**
- **Render**: Para começar rápido
- **Fly.io**: Para performance
- **Supabase**: Para prototipagem

### **2. Faça o deploy**
- Siga as instruções específicas
- Configure as variáveis de ambiente
- Teste a API

### **3. Atualize o Frontend**
- Mude `NEXT_PUBLIC_API_URL` para a nova URL
- Teste todas as funcionalidades
- Deploy no Vercel

---

**Escolha o Render para começar! É o mais simples e gratuito para backend + banco.** 🟢

