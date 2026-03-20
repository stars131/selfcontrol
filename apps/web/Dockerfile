FROM node:20-alpine

WORKDIR /app/apps/web

COPY apps/web/package.json /app/apps/web/package.json
RUN npm install

COPY apps/web /app/apps/web

EXPOSE 3000

