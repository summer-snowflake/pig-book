class AddCurrencyToMonthlyBalanceTables < ActiveRecord::Migration[5.1]
  def change
    add_column :monthly_balance_tables, :currency, :integer, default: 0, null: false
  end
end
