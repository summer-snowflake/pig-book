# frozen_string_literal: true

class YearlyTotalBalanceTable < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
end
