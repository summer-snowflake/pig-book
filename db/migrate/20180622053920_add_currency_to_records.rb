class AddCurrencyToRecords < ActiveRecord::Migration[5.1]
  def change
    add_column :records, :currency, :integer, default: 0, null: false
  end
end
