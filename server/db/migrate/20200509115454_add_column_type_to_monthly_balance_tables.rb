class AddColumnTypeToMonthlyBalanceTables < ActiveRecord::Migration[6.0]
  def change
    add_column :monthly_balance_tables, :type, :string, null: false
  end
end
