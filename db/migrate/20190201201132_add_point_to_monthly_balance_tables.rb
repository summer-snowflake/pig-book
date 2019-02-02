class AddPointToMonthlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    add_column :monthly_balance_tables, :point, :integer, null: false, default: 0
  end
end
