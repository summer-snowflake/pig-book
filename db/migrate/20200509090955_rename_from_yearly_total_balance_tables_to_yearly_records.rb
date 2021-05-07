class RenameFromYearlyTotalBalanceTablesToYearlyRecords < ActiveRecord::Migration[6.0]
  def change
    rename_table :yearly_total_balance_tables, :yearly_records
  end
end
