class RenameFromMonthlyBalanceTablesToMonthkyRecords < ActiveRecord::Migration[6.0]
  def change
    rename_table :monthly_balance_tables, :monthly_records
  end
end
