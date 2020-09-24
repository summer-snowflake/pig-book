class CreateAssetsAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :assets_accounts do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.string :name, null: false, default: ''
      t.boolean :balance_of_payments, default: true, null: false
      t.integer :currency, default: 0, null: false
      t.integer :money, null: false, default: 0

      t.timestamps
    end
  end
end
