FROM node:20-bullseye-slim as build

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN rm -rf node_modules

RUN npm ci --production

FROM node:18-alpine3.18 as final

ENV NODE_ENV production

USER node

WORKDIR /usr/src/app

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

COPY --from=build --chown=node:node /usr/src/app/node_modules node_modules

COPY --chown=node:node package*.json ./

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/src/main/http/server.js" ]