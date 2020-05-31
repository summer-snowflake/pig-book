# base image
FROM node:12

# set working directory
RUN mkdir -p /pig-book/client
WORKDIR /pig-book/client

ENV PATH /pig-book/client/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /pig-book/client/package.json
RUN yarn install --silent
COPY . /pig-book/client

RUN yarn add serve
