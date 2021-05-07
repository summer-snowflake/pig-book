class RemoveUserIdFromPiggyItems < ActiveRecord::Migration[6.0]
  def change
    remove_column :piggy_items, :user_id
  end
end
