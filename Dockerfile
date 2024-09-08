FROM node:current-slim

WORKDIR /server

COPY /src /server/src
COPY /prisma /server/prisma
COPY /secrets /server/secrets
COPY /static /server/static
# COPY .env /server/
COPY .eslintrc.js /server/
COPY nest-cli.json /server/
COPY tsconfig.json /server/
COPY tsconfig.build.json /server/
COPY package.json /server/
COPY docker-cmd.sh /server/
COPY bun.lockb /server/

# RUN npm i && npm cache clean --force \
# 	&& npm i @esbuild/linux-x64 esbuild-linux-64 \
# 	&& npm run build

RUN apt-get update -y && apt-get install -y openssl

RUN npm install
# RUN npm install -g bun
# RUN bun install

EXPOSE 8080

CMD ["./docker-cmd.sh"]