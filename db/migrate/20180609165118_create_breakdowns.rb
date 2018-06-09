class CreateBreakdowns < ActiveRecord::Migration[5.1]
  def change
    create_table :breakdowns do |t|
      t.string :name, null: false
      t.references :category, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
