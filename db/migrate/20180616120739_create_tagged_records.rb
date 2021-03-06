class CreateTaggedRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :tagged_records do |t|
      t.references :tag, foreign_key: true, index: true, null: false
      t.references :record, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
