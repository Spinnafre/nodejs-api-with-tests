FROM node:20-bullseye-slim as base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN rm -rf node_modules


FROM node:20-bullseye-slim as development
WORKDIR /usr/src/app
LABEL mode="development"
COPY --from=base /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=base package*.json ./
ADD . /usr/src/app
RUN npm ci
ENV NODE_ENV development
EXPOSE 8080
ENTRYPOINT ["dumb-init", "--"]
CMD [ "npm","run","debug:dev" ]


FROM node:18-alpine3.18 as production
LABEL mode="production"
WORKDIR /usr/src/app
USER node
COPY --from=base /usr/bin/dumb-init /usr/bin/dumb-init
# COPY --from=base /usr/src/app/node_modules node_modules
COPY --from=base  --chown=node:node dist ./
COPY --from=base --chown=node:node package*.json ./
RUN npm ci --production
ENV NODE_ENV production
EXPOSE 8080
ENTRYPOINT ["dumb-init", "--"]
CMD [ "node", "dist/main/http/server.js" ]

