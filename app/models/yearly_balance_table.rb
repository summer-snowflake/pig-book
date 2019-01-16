# frozen_string_literal: true

class YearlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
  belongs_to :category, optional: true

  validates :year, presence: true

  scope :totals, lambda {
    where(category: nil)
  }
end
