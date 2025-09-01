# Dockerfile simplificado para NestJS FishNet API
FROM node:20.18.0-slim

# Instalar dependências do sistema
RUN apt-get update -qq && apt-get install --no-install-recommends -y \
    openssl \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar todas as dependências (incluindo dev para build)
RUN npm install

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Remover dependências de desenvolvimento
RUN npm prune --production

# Expor porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
