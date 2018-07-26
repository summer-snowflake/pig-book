class CreateMonthlyBalanceTables < ActiveRecord::Migration[5.1]
  def change
    create_table :monthly_balance_tables do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.timestamp :beginning_at, null: false
      t.integer :income, null: false, default: 0
      t.integer :expenditure, null: false, default: 0

      t.timestamps
    end
  end
end
