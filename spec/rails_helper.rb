# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)

require 'spec_helper'
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'simplecov'
require 'selenium-webdriver'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

Capybara.default_max_wait_time = 20
Capybara.javascript_driver = :selenium
Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(
      chrome_options: {
        args: %w[headless disable-gpu window-size=1680,1050]
      }
    )
  )
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

ActiveRecord::Migration.maintain_test_schema!
SimpleCov.start do
  add_group 'Models', 'app/models'
  add_group 'Controllers', 'app/controllers'
  add_group 'Helpers', 'app/helpers'
  add_group 'Libraries', 'lib'
  add_group 'Decorators', 'app/decorators'
  add_group 'Uploaders', 'app/uploaders'
end

RSpec.configure do |config|
  include ActionDispatch::TestProcess

  config.include Capybara::DSL
  config.include FactoryBot::Syntax::Methods
  config.include Warden::Test::Helpers
  config.include FeatureSpecHelper, type: :feature

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!

  config.before :suite do
    I18n.locale = :ja
    begin
      FactoryBot.lint
    ensure
      DatabaseRewinder.clean_all
    end
  end

  config.after :each do
    Warden.test_reset!
    DatabaseRewinder.clean_all
  end
end
