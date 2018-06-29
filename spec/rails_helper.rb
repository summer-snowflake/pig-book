# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)

require 'spec_helper'
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/email/rspec'
require 'capybara-screenshot/rspec'
require 'selenium-webdriver'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

require 'simplecov'
require 'codecov'

if ENV['CI']
  SimpleCov.start do
    add_group 'Models', 'app/models'
    add_group 'Controllers', 'app/controllers'
    add_group 'Helpers', 'app/helpers'
    add_group 'Libraries', 'lib'
    add_group 'Decorators', 'app/decorators'
    add_group 'Uploaders', 'app/uploaders'
  end
  SimpleCov.formatter = SimpleCov::Formatter::Codecov
else
  SimpleCov.start do
    add_group 'Models', 'app/models'
    add_group 'Controllers', 'app/controllers'
    add_group 'Decorators', 'app/decorators'
    add_group 'Serializers', 'app/serializers'
    add_filter '/spec/'
  end
end

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

Capybara::Screenshot.register_driver(:headless_chrome) do |driver, path|
  driver.browser.save_screenshot(path)
end

RSpec.configure do |config|
  include ActionDispatch::TestProcess

  config.include Capybara::DSL
  config.include FactoryBot::Syntax::Methods
  config.include Warden::Test::Helpers
  config.include JsonSpec::Helpers
  config.include FeatureSpecHelper, type: :feature
  config.include RequestSpecHelper, type: :request

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!

  # NOTE: coverage 算出において features spec を含めない場合に指定
  # config.filter_run_excluding js: true

  config.before(:each, type: :system, js: true) do
    driven_by :chrome_headless
  end

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

  config.after(:each, type: :system, js: true) do
    # NOTE: browserのerrorsを表示する
    errors = page.driver.browser.manage.logs.get(:browser)
    if errors.present?
      message = errors.map(&:message).join("\n")
      puts message
    end
  end
end
