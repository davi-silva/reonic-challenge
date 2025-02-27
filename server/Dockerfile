FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npx prisma generate

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm","run", "start"]