class AddUnlimitedOptionToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :unlimited_option, :boolean, default: false, null: false
  end
end
