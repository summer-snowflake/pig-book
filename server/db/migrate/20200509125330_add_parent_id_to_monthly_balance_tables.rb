class AddParentIdToMonthlyBalanceTables < ActiveRecord::Migration[6.0]
  def change
    add_column :monthly_balance_tables, :parent_id, :bigint
  end
end
