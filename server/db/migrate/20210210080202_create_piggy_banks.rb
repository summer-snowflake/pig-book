class CreatePiggyBanks < ActiveRecord::Migration[6.0]
  def change
    create_table :piggy_banks do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.string :title, default: '', null: false
      t.string :description, default: '', null: false

      t.timestamps
    end
  end
end
