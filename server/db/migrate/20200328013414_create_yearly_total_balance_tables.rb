class CreateYearlyTotalBalanceTables < ActiveRecord::Migration[6.0]
  def change
    create_table :yearly_total_balance_tables do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.integer :year, null: false
      t.integer :currency, default: 0, null: false
      t.decimal :income, default: 0, null: false
      t.decimal :expenditure, default: 0, null: false
      t.integer :cashless_charge, default: 0, null: false
      t.integer :point, default: 0, null: false

      t.timestamps
    end
  end
end
