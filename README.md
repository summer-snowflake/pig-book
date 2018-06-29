おこづかいちょうβ
=======

This tool is for a household account book.

## Continuous Integration (CI)

![CircleCI](https://circleci.com/gh/summer-snowflake/pig-book/tree/master.svg?style=shield&circle-token=e90d1bd5a4b016ea384ddf835b97ac7429035b8d)

## Test coverage

[![codecov](https://codecov.io/gh/summer-snowflake/pig-book/branch/master/graph/badge.svg)](https://codecov.io/gh/summer-snowflake/pig-book)

## Production

- http://pig-book.herokuapp.com/

- Not acquired a domain yet.

## Staging

- http://pig-book-test.herokuapp.com/

## Development

### Author

- [@kae_kasui](https://twitter.com/kae_kasui)

### Version & Environment

- Ruby
  - v2.5+
  - [Click here for details](https://github.com/summer-snowflake/pig-book/blob/master/Gemfile#L8)

- Ruby on Rails
  - v5.1+
  - [Click here for details](https://github.com/summer-snowflake/pig-book/blob/master/Gemfile#L10)

- PostgreSQL
  - v10.4

- Redis
  - v4.0.9

### Coding Rule

Basically, Use the following:

- [rubocop](https://github.com/bbatsov/rubocop)
  - [.rubocop.yml](https://github.com/summer-snowflake/pig-book/blob/master/.rubocop.yml)

- [scss-lint](https://github.com/brigade/scss-lint)
  - [.scss-lint.yml](https://github.com/summer-snowflake/pig-book/blob/master/.scss-lint.yml)

- [slim-lint](https://github.com/sds/slim-lint)
  - [.slim-lint.yml](https://github.com/summer-snowflake/pig-book/blob/master/.slim-lint.yml)


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

- Ruby

```
rbenv install -l
rbenv install 2.5.1
rbenv rehash
```

- PostgreSQL

```
brew install postgres
postgres -D /usr/local/var/postgres
```

### Get pig-book Code

```
git clone https://github.com/summer-snowflake/account-book-pig.git
```

### Use Rbenv

- [rbenv](https://github.com/rbenv/rbenv)

### Install Rails and Gems

```
cd pig-book
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

### Start Server

```
bin/rails s
```
