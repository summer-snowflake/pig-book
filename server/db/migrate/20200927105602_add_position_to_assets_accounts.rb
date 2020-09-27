class AddPositionToAssetsAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :assets_accounts, :position, :integer
  end
end
