class AddCashlessChargeToRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :records, :cashless_charge, :integer
  end
end
