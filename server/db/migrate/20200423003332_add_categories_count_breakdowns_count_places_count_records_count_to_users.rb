class AddCategoriesCountBreakdownsCountPlacesCountRecordsCountToUsers < ActiveRecord::Migration[6.0]
  def self.up
    add_column :users, :categories_count, :integer, null: false, default: 0
    add_column :users, :breakdowns_count, :integer, null: false, default: 0
    add_column :users, :places_count, :integer, null: false, default: 0
    add_column :users, :records_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :users, :categories_count
    remove_column :users, :breakdowns_count
    remove_column :users, :places_count
    remove_column :users, :records_count
  end
end
