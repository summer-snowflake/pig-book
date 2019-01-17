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
      tables = where(balance_of_payments: true)
      tables.present? ? tables : [YearlyBalanceTable.new]
    end

    def expenditure
      tables = where(balance_of_payments: false)
      tables.present? ? tables : [YearlyBalanceTable.new]
    end

    def category_totals(year)
      where(year: year).where.not(category: nil)
    end
  end
end
