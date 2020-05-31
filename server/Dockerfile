FROM ruby:2.7.1-alpine

ENV LANG C.UTF-8
ENV RAILS_ENV=development

RUN apk add --update --no-cache --virtual=builders \
      alpine-sdk build-base linux-headers ruby-dev zlib-dev postgresql-dev
RUN apk add --update --no-cache \
      libc6-compat libc-dev zlib ruby-json tzdata yaml less curl postgresql
RUN mkdir -p /pig-book/server

WORKDIR /pig-book/server

COPY Gemfile /pig-book/server/Gemfile
COPY Gemfile.lock /pig-book/server/Gemfile.lock
RUN gem install bundler
RUN bundle install -j4
COPY . /pig-book/server
