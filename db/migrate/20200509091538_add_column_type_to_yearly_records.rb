class AddColumnTypeToYearlyRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :yearly_records, :type, :string, null: false
  end
end
