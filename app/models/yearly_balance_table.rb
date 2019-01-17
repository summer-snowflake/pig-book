# frozen_string_literal: true

class YearlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
  belongs_to :category, optional: true

  validates :year, presence: true

  class << self
    def totals(year)
      where(category: nil, year: year)
    end

    def income
      where(balance_of_payments: true)
    end

    def expenditure
      where(balance_of_payments: false)
    end

    def category_totals(year)
      where(year: year).where.not(category: nil)
    end
  end
end
