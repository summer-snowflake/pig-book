# frozen_string_literal: true

class YearlyBalanceTableDecorator < ApplicationDecorator
  delegate_all
  include CurrencyFormatter

  def human_charge
    with_format(charge)
  end

  def category_name
    category&.name || other_name
  end

  def breakdown_name
    breakdown&.name || other_name
  end

  def other_name
    other? ? 'その他' : ''
  end
end
