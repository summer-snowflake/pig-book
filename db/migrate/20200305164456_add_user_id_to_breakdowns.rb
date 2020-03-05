class AddUserIdToBreakdowns < ActiveRecord::Migration[5.2]
  def change
    add_reference :breakdowns, :user, foreign_key: true, index: true
  end
end
