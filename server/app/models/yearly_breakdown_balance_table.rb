# frozen_string_literal: true

class YearlyBreakdownBalanceTable < YearlyRecord
  belongs_to :category
  belongs_to :breakdown
end
