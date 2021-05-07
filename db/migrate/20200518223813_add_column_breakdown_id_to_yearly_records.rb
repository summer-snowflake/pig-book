class AddColumnBreakdownIdToYearlyRecords < ActiveRecord::Migration[6.0]
  def change
    add_reference :yearly_records, :breakdown
  end
end
