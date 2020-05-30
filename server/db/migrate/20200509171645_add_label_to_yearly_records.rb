class AddLabelToYearlyRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :yearly_records, :label, :string
  end
end
