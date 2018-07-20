class AddPointToRecords < ActiveRecord::Migration[5.1]
  def change
    add_column :records, :point, :integer, default: 0
  end
end
