class AddOptionToRecords < ActiveRecord::Migration[6.0]
  def change
    change_column :records, :cashless_charge, :integer, default: 0, null: false
    change_column :records, :point, :integer, default: 0, null: false
  end
end
