class CreateTemplates < ActiveRecord::Migration[5.1]
  def change
    create_table :templates do |t|
      t.references :category, foreign_key: true, index: true, null: false
      t.string :name, null: false
      t.integer :charge
      t.references :breakdown, foreign_key: true, index: true
      t.references :tag, foreign_key: true, index: true
      t.text :memo

      t.timestamps
    end
  end
end
