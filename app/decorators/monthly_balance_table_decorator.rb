# frozen_string_literal: true

class MonthlyBalanceTableDecorator < ApplicationDecorator
  delegate_all
  include CurrencyFormatter

  def human_income
    with_format(income)
  end

  def human_expenditure
    with_format(expenditure)
  end

  def human_month
    I18n.l(date, format: :month)
  end
end
