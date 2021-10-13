FROM node:16.3-alpine

RUN apk update && \
  apk add git

RUN yarn install && yarn global add \
  create-react-app && yarn add -D \
  hardhat

WORKDIR /src