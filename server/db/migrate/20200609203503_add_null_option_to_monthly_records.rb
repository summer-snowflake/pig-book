class AddNullOptionToMonthlyRecords < ActiveRecord::Migration[6.0]
  def change
    change_column_null :monthly_records, :type, false
  end
end
