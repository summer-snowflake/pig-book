# frozen_string_literal: true

class YearlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency
  include YearlyStiable

  belongs_to :user

  validates :year, presence: true

  class << self
    def income
      where(balance_of_payments: true)
    end

    def expenditure
      where(balance_of_payments: false)
    end
  end
end
