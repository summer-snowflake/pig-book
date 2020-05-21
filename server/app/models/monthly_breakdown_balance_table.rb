# frozen_string_literal: true

class MonthlyBreakdownBalanceTable < MonthlyRecord
  belongs_to :category
  belongs_to :breakdown, optional: true
end
