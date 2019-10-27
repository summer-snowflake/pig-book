class ChangeColumnMemoToProfiles < ActiveRecord::Migration[5.2]
  def change
    change_column :profiles, :memo, :text, null: false, default: ''
  end
end
