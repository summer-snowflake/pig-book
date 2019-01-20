# frozen_string_literal: true

module CurrencyFormatter
  extend ActiveSupport::Concern
  include ActionView::Helpers::NumberHelper

  YEN_PRECISION = 0
  DOLLAR_PRECISION = 2

  def with_format(money)
    precision = yen? ? YEN_PRECISION : DOLLAR_PRECISION
    number_to_currency(money, unit: human_currency,
                              format: '%u%n', precision: precision)
  end

  private

  def human_currency
    I18n.t("helpers.label.profile.currency.#{user.base_setting.currency}")
  end
end
