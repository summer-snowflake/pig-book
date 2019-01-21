# frozen_string_literal: true

class YearlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency
  include YearlyStiable

  belongs_to :user

  validates :year, presence: true

  class << self
    def totals(year)
      where(category: nil, other: false, year: year)
    end

    def income
      where(balance_of_payments: true)
    end

    def expenditure
      where(balance_of_payments: false)
    end

    def category_totals(year)
      where(year: year).where.not(category: nil).order(charge: :desc)
    end
  end
end
