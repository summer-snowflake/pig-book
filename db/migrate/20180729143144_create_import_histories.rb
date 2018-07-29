class CreateImportHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :import_histories do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.text :row, null: false

      t.timestamps
    end
  end
end
