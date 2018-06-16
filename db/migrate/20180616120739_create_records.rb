class CreateRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :records do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.date :published_on
      t.references :category, foreign_key: true, index: true, null: false
      t.references :breakdown, foreign_key: true, index: true, null: false
      t.references :place, foreign_key: true, index: true, null: false
      t.integer :charge, null: false
      t.string :memo

      t.timestamps
    end
  end
end
