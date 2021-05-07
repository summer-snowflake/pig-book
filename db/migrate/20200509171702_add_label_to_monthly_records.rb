class AddLabelToMonthlyRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :monthly_records, :label, :string
  end
end
