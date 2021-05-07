class AddCategoryIdToMonthlyBalanceTables < ActiveRecord::Migration[6.0]
  def change
    add_reference :monthly_balance_tables, :category
  end
end
