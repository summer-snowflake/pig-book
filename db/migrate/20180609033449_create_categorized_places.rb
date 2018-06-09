class CreateCategorizedPlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :categorized_places do |t|
      t.references :place, foreign_key: true, index: true, null: false
      t.references :category, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
