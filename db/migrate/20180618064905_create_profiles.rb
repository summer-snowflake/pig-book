class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.integer :locale, default: 0, null: false
      t.integer :currency, default: 0, null: false
      t.text :memo, default: '', null: false

      t.timestamps
    end
  end
end
