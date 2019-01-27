# frozen_string_literal: true

class YearlyCategoryBalanceTable < YearlyBalanceTable
  belongs_to :category, optional: true

  class << self
    def with_other
      ids = where(other: false).limit(6).pluck(:id) +
            where(other: true).pluck(:id)
      yearly = where(id: ids).includes(:category)
      ids.collect { |id| yearly.detect { |x| x.id == id.to_i } }
    end
  end
end
