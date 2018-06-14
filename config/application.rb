require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PigBook
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    config.serve_static_assets = true

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.i18n.default_locale = :ja

    # Generate slim templates
    config.generators.template_engine = :slim

    # Change the class name when validation errors occure
    config.action_view.field_error_proc = proc { |html_tag, instance| "<div class='field-with-errors'>#{html_tag}</div>".html_safe }

    # Generate factory bot file
    config.generators do |g|
      g.assets false
      g.helper false
      g.test_framework :rspec,
        fixture_replacement: :factory_bot,
        view_specs: false,
        helper_specs: false
    end
  end
end
