class CreateCsvFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :csv_files do |t|
      t.text :csv_data, null: false
      t.string :conditions, null: false

      t.timestamps
    end
  end
end
