source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.5.3'

gem 'rails', '~> 5.2.2'
gem 'pg'
gem 'puma'
gem 'sass-rails'
gem 'uglifier'
gem 'coffee-rails'
gem 'turbolinks'
gem 'jbuilder'
gem 'active_model_serializers'
gem 'slim-rails'
gem 'rails-i18n'
gem 'bootstrap'
gem 'devise'
gem 'omniauth-twitter'
gem 'draper'
gem 'react-rails'
gem 'webpacker'
gem 'dotenv-rails'
gem 'slack-notifier'

group :development, :test do
  gem 'rubocop'
  gem 'factory_bot_rails'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'letter_opener'
  gem 'letter_opener_web'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'web-console'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'slim_lint', require: false
  gem 'scss_lint', require: false
end

group :test do
  gem 'capybara'
  gem 'capybara-email'
  gem 'capybara-screenshot'
  gem 'faker'
  gem 'rspec-rails'
  gem 'rspec-retry'
  gem 'rspec_junit_formatter'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers', github: 'thoughtbot/shoulda-matchers'
  gem 'database_rewinder'
  gem 'chromedriver-helper'
  gem 'simplecov', require: false
  gem 'codecov', require: false
  gem 'json_spec'
end

group :production do
  gem 'lograge'
  gem 'rails_12factor'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
