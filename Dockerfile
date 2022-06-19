FROM node:17.8-alpine3.14

RUN export NODE_ENV=production

WORKDIR /app
COPY package.json ./
RUN npm i --only=prod

COPY ./dist/ ./dist/
COPY .env_sample .env

CMD ["npm", "run", "deploy"]