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
  end
end
