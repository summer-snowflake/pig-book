class AddColumnCheckedToAssetsAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :assets_accounts, :checked, :boolean, default: false
  end
end
