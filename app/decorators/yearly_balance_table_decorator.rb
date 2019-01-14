# frozen_string_literal: true

class YearlyBalanceTableDecorator < ApplicationDecorator
  delegate_all
  include CurrencyFormatter

  def human_total_income
    with_format(income)
  end

  def human_total_expenditure
    with_format(expenditure)
  end
end
