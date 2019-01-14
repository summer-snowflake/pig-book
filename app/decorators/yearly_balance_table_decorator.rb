# frozen_string_literal: true

class YearlyBalanceTableDecorator < ApplicationDecorator
  delegate_all
  include ActionView::Helpers::NumberHelper

  YEN_PRECISION = 0
  DOLLAR_PRECISION = 2

  def human_total_income
    precision = yen? ? YEN_PRECISION : DOLLAR_PRECISION
    number_to_currency(income, unit: human_currency,
                               format: '%u%n', precision: precision)
  end

  def human_total_expenditure
    precision = yen? ? YEN_PRECISION : DOLLAR_PRECISION
    number_to_currency(expenditure, unit: human_currency,
                                    format: '%u%n', precision: precision)
  end

  private

  def human_currency
    I18n.t("helpers.label.profile.currency.#{user.base_setting.currency}")
  end
end
