# frozen_string_literal: true

class YearlyBalanceTableDecorator < ApplicationDecorator
  delegate_all
  include CurrencyFormatter

  def human_charge
    with_format(charge)
  end
end
