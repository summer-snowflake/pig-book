# frozen_string_literal: true

class YearlyBreakdownBalanceTable < YearlyBalanceTable
  belongs_to :category, optional: true
  belongs_to :breakdown, optional: true
end
