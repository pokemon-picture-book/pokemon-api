FROM node:14-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 80