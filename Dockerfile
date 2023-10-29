#build Stage
FROM node:18-alpine AS Build

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .

RUN npx prisma generate dev

RUN npm run build

#prod stage
FROM node:18-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install

RUN npx prisma generate dev

RUN rm package*.json

EXPOSE 3000


CMD [ "node" , "dist/main.js" ]