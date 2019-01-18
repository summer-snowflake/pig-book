class AddChargeToYearlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    add_column :yearly_balance_tables, :charge, :integer, null: false, default: 0
    add_column :yearly_balance_tables, :balance_of_payments, :boolean, null: false, default: false

    remove_column :yearly_balance_tables, :income, :integer, null: false, default: 0
    remove_column :yearly_balance_tables, :expenditure, :integer, null: false, default: 0
  end
end
