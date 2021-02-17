class AddColumnCurrencyToPiggyBanks < ActiveRecord::Migration[6.0]
  def change
    add_column :piggy_banks, :currency, :integer, default: 0, null: false
  end
end
