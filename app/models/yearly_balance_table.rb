# frozen_string_literal: true

class YearlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user

  validates :year, presence: true
end
