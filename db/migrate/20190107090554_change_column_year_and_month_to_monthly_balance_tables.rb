class ChangeColumnYearAndMonthToMonthlyBalanceTables < ActiveRecord::Migration[5.2]
  def up
    change_column :monthly_balance_tables, :year_and_month, :string
  end

  def down
    change_column :monthly_balance_tables, :year_and_month, :datetime
  end
end
