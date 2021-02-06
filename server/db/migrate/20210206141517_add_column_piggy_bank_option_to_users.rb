class AddColumnPiggyBankOptionToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :piggy_bank_option, :boolean, default: false, null: false
  end
end
