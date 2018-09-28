class AddMemoToProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :profiles, :memo, :string, null: false, default: ''
  end
end
