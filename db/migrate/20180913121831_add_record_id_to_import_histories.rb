class AddRecordIdToImportHistories < ActiveRecord::Migration[5.2]
  def change
    add_reference :import_histories, :record, foreign_key: true, index: true
  end
end
