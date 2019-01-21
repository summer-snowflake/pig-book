# frozen_string_literal: true

class YearlyCategoryBalanceTable < YearlyBalanceTable
  belongs_to :category, optional: true
end
