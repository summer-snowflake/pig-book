# frozen_string_literal: true

class MonthlyCategoryBalanceTable < MonthlyRecord
  belongs_to :category, class_name: 'Category', foreign_key: :parent_id
end
