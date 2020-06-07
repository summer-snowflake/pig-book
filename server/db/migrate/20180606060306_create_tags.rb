class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.string :name, null: false
      t.string :color_code, null: false

      t.timestamps
    end
  end
end
