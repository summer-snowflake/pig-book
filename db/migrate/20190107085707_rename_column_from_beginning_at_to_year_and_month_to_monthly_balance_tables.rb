class RenameColumnFromBeginningAtToYearAndMonthToMonthlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    rename_column :monthly_balance_tables, :beginning_at, :year_and_month
  end
end
