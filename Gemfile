# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

ruby '2.6.5'

gem 'active_model_serializers'
gem 'aws-sdk'
gem 'bootstrap'
gem 'coffee-rails'
gem 'devise'
gem 'dotenv-rails'
gem 'draper'
gem 'jbuilder'
gem 'mini_racer'
gem 'omniauth-twitter'
gem 'pg'
gem 'puma'
gem 'rails', '~> 5.2.2'
gem 'rails-i18n'
gem 'react-rails'
gem 'sass-rails'
gem 'slack-notifier'
gem 'slim-rails'
gem 'turbolinks'
gem 'uglifier'
gem 'webpacker'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'letter_opener'
  gem 'letter_opener_web'
  gem 'rubocop'
  gem 'rubocop-performance'
  gem 'timecop'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'bullet'
  gem 'listen'
  gem 'scss_lint', require: false
  gem 'slim_lint', require: false
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'
end

group :test do
  gem 'capybara'
  gem 'capybara-email'
  gem 'capybara-screenshot'
  gem 'codecov', require: false
  gem 'database_rewinder'
  gem 'faker'
  gem 'json_spec'
  gem 'rspec-rails'
  gem 'rspec-retry'
  gem 'rspec_junit_formatter'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers', github: 'thoughtbot/shoulda-matchers'
  gem 'simplecov', require: false
  gem 'webdriver'
end

group :production do
  gem 'lograge'
  gem 'rails_12factor'
end
