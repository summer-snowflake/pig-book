class AddColumnBreakdownIdToMonthlyRecords < ActiveRecord::Migration[6.0]
  def change
    add_reference :monthly_records, :breakdown
  end
end
