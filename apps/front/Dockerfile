FROM node:16-alpine

WORKDIR /app

ENV PATH=$PATH:/app/node_modules/.bin
ENV CI=1

RUN apk add --no-cache libc6-compat
RUN npm --no-update-notifier --no-fund install --global pnpm
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

COPY --chown=app:nodejs apps/front ./
COPY --chown=app:nodejs libs .libs

RUN echo 'packages: [".", ".libs/**"]' > pnpm-workspace.yaml && \
    pnpm install -r --prod --no-frozen-lockfile && \
    chown -R app:nodejs /app

USER app

EXPOSE 3000
ENV PORT 3000
ENV CI=0
ENV NODE_ENV=production

CMD ["next", "start"]
