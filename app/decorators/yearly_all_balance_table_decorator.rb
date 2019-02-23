# frozen_string_literal: true

class YearlyAllBalanceTableDecorator < ApplicationDecorator
  delegate_all
  include CurrencyFormatter

  def human_income
    with_format(income)
  end

  def human_expenditure
    with_format(expenditure)
  end
end
