FROM node:18.7.0-alpine

WORKDIR /app

COPY . .

RUN npm install -g npm@9.6.4
RUN npm install --production

EXPOSE 8080

CMD ["node", "app.js"]
