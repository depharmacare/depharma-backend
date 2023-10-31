# Build Stage
FROM node:18-alpine AS Build

WORKDIR /usr/src/app

COPY package*.json ./

# Install Prisma CLI
RUN npm install -g prisma

# Install project dependencies
RUN npm install

COPY . .

# Generate Prisma types
RUN npx prisma generate

RUN npm run build

# Prod Stage
FROM node:18-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=Build /usr/src/app/dist ./dist

COPY package*.json ./

# Install Prisma CLI (if you need it in the production stage)
RUN npm install -g prisma

# Install production dependencies (without dev dependencies)
RUN npm install --only=production

# Prisma generation in the production stage
RUN npx prisma generate

RUN rm package*.json

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
