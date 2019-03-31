class CreateDownloadFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :download_files do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.string :filename, null: false
      t.string :path, null: false

      t.timestamps
    end
  end
end
