class AddDailyOptionToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :daily_option, :boolean, default: false, null: false
  end
end
