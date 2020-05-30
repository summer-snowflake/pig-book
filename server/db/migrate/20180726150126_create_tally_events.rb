class CreateTallyEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :tally_events do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.integer :year, null: false

      t.timestamps
    end
  end
end
