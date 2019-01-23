# frozen_string_literal: true

class YearlyCategoryBalanceTable < YearlyBalanceTable
  belongs_to :category, optional: true

  class << self
    def with_other
      ids = where(other: false).limit(5).pluck(:id) +
            where(other: true).pluck(:id)
      where(id: ids)
    end
  end
end
