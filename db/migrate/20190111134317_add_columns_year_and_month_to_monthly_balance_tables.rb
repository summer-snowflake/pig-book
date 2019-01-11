class AddColumnsYearAndMonthToMonthlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    add_column :monthly_balance_tables, :year, :integer
    add_column :monthly_balance_tables, :month, :integer
  end
end
