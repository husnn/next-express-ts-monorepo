FROM node:16-alpine

RUN apk add --update --no-cache \
    build-base \
    bash \
    curl \
    make \
    python3

RUN npm i -g pnpm

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

ADD . ./
RUN pnpm install -r

RUN pnpm build
