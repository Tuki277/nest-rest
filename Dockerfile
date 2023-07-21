FROM node:slim as builder

LABEL maintainer="huyth"

EXPOSE 3000

ENV NODE_ENV development

WORKDIR /home/node

COPY . /home/node

RUN yarn install --pure-lockfile

RUN yarn build

CMD ["node", "dist/main.js"]

