FROM node:14
WORKDIR /usr/app
COPY package*.json ./

# RUN apt-get update
# RUN apt-get install -y openjdk-8-jre

RUN npm ci
