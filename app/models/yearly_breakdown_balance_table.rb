# frozen_string_literal: true

class YearlyBreakdownBalanceTable < YearlyBalanceTable
  belongs_to :category, optional: true
  belongs_to :breakdown, optional: true

  class << self
    def sort_category(category_totals)
      category_ids =
        category_totals.where(other: false).limit(6).pluck(:category_id)

      # NOTE: カテゴリの並び順を指定
      category_yearly = where(category_id: category_ids)
      ids = category_ids
            .collect { |id| category_yearly.where(category_id: id) }
            .flatten.pluck(:id) +
            where(other: true).pluck(:id)
      yearly = where(id: ids).includes(:category, :breakdown)
      ids.collect { |id| yearly.detect { |x| x.id == id.to_i } }
    end
  end
end
