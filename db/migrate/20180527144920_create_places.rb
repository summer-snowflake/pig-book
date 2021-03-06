class CreatePlaces < ActiveRecord::Migration[6.0]
  def change
    create_table :places do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
