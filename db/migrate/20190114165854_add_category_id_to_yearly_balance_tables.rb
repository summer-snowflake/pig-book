class AddCategoryIdToYearlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    add_reference :yearly_balance_tables, :category, foreign_key: true, index: true
  end
end
