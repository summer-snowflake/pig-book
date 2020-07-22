class ChangeTypeToMonthlyRecords < ActiveRecord::Migration[6.0]
  def change
    change_column :monthly_records, :income, :integer, null: false, default: 0
    change_column :monthly_records, :expenditure, :integer, null: false, default: 0
  end
end
