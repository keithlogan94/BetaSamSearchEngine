FROM arm64v8/node:latest

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD node lib
