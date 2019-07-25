FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY src/ src/

CMD [ "npm", "start" ]