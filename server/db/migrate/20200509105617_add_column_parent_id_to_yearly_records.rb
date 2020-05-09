class AddColumnParentIdToYearlyRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :yearly_records, :parent_id, :bigint
  end
end
