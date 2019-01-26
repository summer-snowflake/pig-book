# frozen_string_literal: true

class YearlyBreakdownBalanceTable < YearlyBalanceTable
  belongs_to :category, optional: true
  belongs_to :breakdown, optional: true

  class << self
    def with_other
      ids = where(other: false).limit(9).pluck(:id) +
            where(other: true).pluck(:id)
      where(id: ids).includes(:category, :breakdown)
    end
  end
end
