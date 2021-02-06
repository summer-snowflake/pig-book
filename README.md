おこづかいちょうβ
=======

This tool is for a household account book.

## Continuous Integration (CI)

![CircleCI](https://circleci.com/gh/summer-snowflake/pig-book/tree/master.svg?style=shield&circle-token=e90d1bd5a4b016ea384ddf835b97ac7429035b8d)

## Test coverage

[![codecov](https://codecov.io/gh/summer-snowflake/pig-book/branch/master/graph/badge.svg)](https://codecov.io/gh/summer-snowflake/pig-book)

## Production

- http://pig-book.info/
- Not acquired a ssh certificate yet.

## Development

### Author

- [@kae_kasui](https://twitter.com/kae_kasui)

### Version & Environment

- Ruby
  - v2.7.2
  - [Click here for details](https://github.com/summer-snowflake/pig-book/blob/master/server/Gemfile#L4)

- Ruby on Rails
  - v6.0.3.1
  - [Click here for details](https://github.com/summer-snowflake/pig-book/blob/master/server/Gemfile#6)

- PostgreSQL
  - v11.3
  - use Docker [Click here for details](https://github.com/summer-snowflake/pig-book/blob/master/docker-compose.yml#L4)

- Redis
  - v6.0.5
  - use Docker [Click here for details](https://github.com/summer-snowflake/pig-book/blob/master/docker-compose.yml#L16)

- node
  - node v12.16.3

### Coding Rule

Basically, Use the following:

- [rubocop](https://github.com/bbatsov/rubocop)
  - [.rubocop.yml](https://github.com/summer-snowflake/pig-book/blob/master/server/.rubocop.yml)

- [sass-lint](https://github.com/sasstools/sass-lint)
  - [.scss-lint.yml](https://github.com/summer-snowflake/pig-book/blob/master/client/.sass-lint.yml)

- [eslint](https://github.com/eslint/eslint)
  - [.eslintrc.json](https://github.com/summer-snowflake/pig-book/blob/master/client/.eslintrc.json)

## How to Install

### Install some Packages

- Command line tools

```
xcode-select --install
```

- Homebrew

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- via Homebrew

```
brew update
brew install rbenv ruby-build
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

### Get pig-book Code

```
git clone https://github.com/summer-snowflake/account-book-pig.git
```

### Install Ruby

```
rbenv install -l
rbenv install 2.7.2
rbenv rehash
```

### Use rbenv and rbenv-gemsets

- [rbenv](https://github.com/rbenv/rbenv)
- [rbenv-gemset](https://github.com/jf/rbenv-gemset)

```
rbenv gemset create 2.7.2 pig-book
rbenv gemset list # show list
```

### Start Server

- Mail server
- Redis server
- postgres server
- rails server
- yarn server

```
docker-compose up
```

### Install Rails and Gems

```
cd pig-book/server
gem install bundle
bundle
```

### Database

```
rails db:create
rails db:migrate
```

### Seed Data

`rails db:seed` is not yet.
