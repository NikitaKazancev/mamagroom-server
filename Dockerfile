FROM node:current-slim

WORKDIR /server

COPY /src /server/src
COPY /prisma /server/prisma
COPY /secrets /server/secrets
COPY /static /server/static
COPY .eslintrc.js /server/
COPY nest-cli.json /server/
COPY tsconfig.json /server/
COPY tsconfig.build.json /server/
COPY package.json /server/
COPY docker-cmd.sh /server/
COPY bun.lockb /server/

RUN apt-get update -y && apt-get install -y openssl

RUN npm install -g bun@1.1.22
RUN bun install

EXPOSE 8080

CMD ["./docker-cmd.sh"]