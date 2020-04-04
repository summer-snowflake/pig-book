class ChangeColumnsToEvents < ActiveRecord::Migration[5.2]
  def change
    rename_table :events, :tally_events

    rename_column :tally_events, :category, :year
    remove_column :tally_events, :created_by
  end
end
