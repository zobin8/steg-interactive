FROM node:18 AS base

# Global config
RUN corepack enable pnpm
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

#
# Install dependencies
#

FROM base AS deps
WORKDIR /app

# Use preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

#
# Build source
#

FROM base AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

#
# Run
#

FROM base as run
WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

CMD ["node", "server.js"]
