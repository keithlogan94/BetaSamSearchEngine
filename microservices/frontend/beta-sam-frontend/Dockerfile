FROM arm64v8/node:latest as build

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM arm64v8/nginx:latest as prod
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80