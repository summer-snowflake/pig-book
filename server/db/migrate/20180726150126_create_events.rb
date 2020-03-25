class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.integer :category, null: false
      t.bigint :created_by

      t.timestamps
    end
  end
end
