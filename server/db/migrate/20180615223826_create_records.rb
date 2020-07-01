class CreateRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :records do |t|
      t.datetime :published_at
      t.references :user, foreign_key: true, index: true, null: false
      t.references :category, foreign_key: true, index: true, null: false
      t.references :breakdown, foreign_key: true, index: true
      t.references :place, foreign_key: true, index: true
      t.decimal :charge, null: false
      t.string :memo
      t.integer :currency, null: false
      t.integer :point, default: 0
      t.integer :cashless_charge, default: 0

      t.timestamps
    end
  end
end
