source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.3'

gem 'rails', '~> 6.0.3.7'
gem 'pg'
gem 'puma'
gem 'bootsnap', require: false
gem 'devise'
gem 'devise_token_auth'
gem 'dotenv-rails'
gem 'rails-i18n'
gem 'counter_culture'
gem 'rack-cors'
gem 'slack-notifier'
gem 'acts_as_list'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'factory_bot_rails'
  gem 'rubocop'
end

group :development do
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
end

group :test do
  gem 'autodoc'
  gem 'database_rewinder'
  gem 'faker'
  gem 'rspec-rails'
  gem 'rspec_junit_formatter'
  gem 'shoulda-matchers', github: 'thoughtbot/shoulda-matchers'
  gem 'json_spec'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
