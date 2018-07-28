# frozen_string_literal: true

class MonthlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
end
