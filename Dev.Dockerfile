FROM node:11
WORKDIR /usr/app
COPY package*.json ./

RUN apt-get update
RUN apt-get install -y openjdk-8-jre

RUN npm config set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm ci
