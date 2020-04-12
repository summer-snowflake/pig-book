class AddColumnCashlessChargeToMonthlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    add_column :monthly_balance_tables, :cashless_charge, :integer, null: false, default: 0
  end
end
