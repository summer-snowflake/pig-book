class AddTypeToYearlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    add_column :yearly_balance_tables, :type, :integer, default: 0, null: false
    add_index :yearly_balance_tables, :type
  end
end
