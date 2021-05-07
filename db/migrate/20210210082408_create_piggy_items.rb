class CreatePiggyItems < ActiveRecord::Migration[6.0]
  def change
    create_table :piggy_items do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.references :piggy_bank, foreign_key: true, index: true, null: false
      t.date :published_on, null: false
      t.boolean :balance_of_payments, default: false, null: false
      t.decimal :charge, null: false
      t.string :name, default: '', null: false

      t.timestamps
    end
  end
end
