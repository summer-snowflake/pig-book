class ChangeColumnsYearAndMonthToMonthlyBalanceTables < ActiveRecord::Migration[5.2]
  def up
    change_column :monthly_balance_tables, :year, :integer, null: false
    change_column :monthly_balance_tables, :month, :integer, null: false
  end

  def down
    change_column :monthly_balance_tables, :year, :integer, null: true
    change_column :monthly_balance_tables, :month, :integer, null: true
  end
end
