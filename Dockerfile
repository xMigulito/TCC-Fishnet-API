# Multi-stage build para otimizar o tamanho da imagem
FROM node:20.18.0-slim AS base

# Instalar dependências do sistema necessárias
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
    openssl \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Gerar cliente Prisma
RUN npx prisma generate

# Stage de build
FROM base AS build

# Instalar dependências de desenvolvimento para build
RUN npm ci --include=dev

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage de produção
FROM base AS production

# Copiar build da aplicação
COPY --from=build /app/dist ./dist

# Copiar arquivos necessários
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expor porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
