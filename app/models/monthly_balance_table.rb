# frozen_string_literal: true

class MonthlyBalanceTable < ApplicationRecord
  belongs_to :user

  enum currency: { yen: 0, dollar: 1 }
end
