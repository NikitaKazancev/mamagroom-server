FROM node:current-slim

WORKDIR /app
COPY . .
RUN mkdir static

RUN apt-get update -y && apt-get install -y openssl dos2unix
RUN dos2unix ./docker-cmd.sh

RUN npm i -g bun@1.1.45
RUN bun install
RUN npx prisma generate
RUN npm run build

RUN chmod +x ./docker-cmd.sh

EXPOSE 8080

CMD ["bash", "./docker-cmd.sh"]
