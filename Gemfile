source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.5.1'

gem 'rails', '~> 5.1.6'
gem 'pg'
gem 'puma'
gem 'sass-rails'
gem 'uglifier'
gem 'coffee-rails'
gem 'turbolinks'
gem 'jbuilder'
gem 'slim-rails'
gem 'rails-i18n'
gem 'bootstrap'

group :development, :test do
  gem 'rubocop'
  gem 'factory_bot_rails'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'slim_lint'
end

group :test do
  gem 'rspec-rails'
  gem 'rspec_junit_formatter'
  gem 'capybara', '~> 2.13'
  gem 'capybara-screenshot'
  gem 'selenium-webdriver'
  gem 'database_rewinder'
  gem 'chromedriver-helper'
  gem 'simplecov'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
