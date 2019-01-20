class CreateYearlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    create_table :yearly_balance_tables do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.integer :year, null: false
      t.integer :income, null: false, default: 0
      t.integer :expenditure, null: false, default: 0
      t.integer :currency, null: false, default: 0

      t.timestamps
    end
  end
end
