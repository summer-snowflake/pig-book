class RemoveYearAndMonthFromMonthlyBalanceTables < ActiveRecord::Migration[5.2]
  def change
    remove_column :monthly_balance_tables, :year_and_month, :string
  end
end
