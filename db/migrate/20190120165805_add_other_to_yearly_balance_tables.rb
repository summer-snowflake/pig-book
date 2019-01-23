class AddOtherToYearlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    add_column :yearly_balance_tables, :other, :boolean, null: false, default: false
  end
end
