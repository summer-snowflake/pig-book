# frozen_string_literal: true

class MonthlyBalanceTableDecorator < ApplicationDecorator
  delegate_all
  include ActionView::Helpers::NumberHelper

  def human_income
    precision = yen? ? 0 : 2
    number_to_currency(income, unit: human_currency,
                               format: '%u%n', precision: precision)
  end

  def human_expenditure
    precision = yen? ? 0 : 2
    number_to_currency(expenditure, unit: human_currency,
                                    format: '%u%n', precision: precision)
  end

  private

  def human_currency
    I18n.t("helpers.label.profile.currency.#{user.base_setting.currency}")
  end
end
