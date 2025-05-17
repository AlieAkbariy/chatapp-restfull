FROM node:22-slim AS base
WORKDIR /app
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

FROM base AS builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate:prod
RUN npm run build

FROM base AS runner
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/docker-entrypoint ./docker-entrypoint
COPY --from=builder /app/prisma ./prisma
RUN chmod -R 755 /app/docker-entrypoint/*
USER node
EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint/entrypoint.sh"]
CMD ["npm", "run", "start:prod"]
