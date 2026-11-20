FROM node:24-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@12.21.0
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* .npmrc* ./
COPY backend/package.json ./backend/
RUN pnpm install --filter backend... --frozen-lockfile || pnpm install --filter backend...
COPY backend ./backend
RUN pnpm --filter backend prisma:generate
RUN pnpm --filter backend build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g pnpm@12.21.0
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* .npmrc* ./
COPY backend/package.json ./backend/
RUN pnpm install --filter backend... --prod --frozen-lockfile || pnpm install --filter backend... --prod
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/backend/node_modules/.prisma ./backend/node_modules/.prisma

EXPOSE 4000
CMD ["node", "backend/dist/main.js"]
