class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.string :name, null: false
      t.boolean :balance_of_payments, null: false, default: false

      t.timestamps
    end
  end
end
