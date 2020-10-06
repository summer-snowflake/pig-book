class ChangeTypeYearlyRecords < ActiveRecord::Migration[6.0]
  def up
    change_column :yearly_records, :income, :integer, default: 0
    change_column :yearly_records, :expenditure, :integer, default: 0
  end

  def down
    change_column :yearly_records, :income, :decimal, default: '0.0'
    change_column :yearly_records, :expenditure, :decimal, default: '0.0'
  end
end
