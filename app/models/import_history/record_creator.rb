# frozen_string_literal: true

class ImportHistory::RecordCreator
  def initialize(user:, import_history_id:)
    @user = user
    @import_history = @user.import_histories.find(import_history_id)
  end

  def create
    ActiveRecord::Base.transaction do
      record_validator = ImportHistory::RecordValidator.new(
        user: @user,
        row: @import_history.row.split(',')
      )
      return false unless record_validator.valid?

      record = @user.records.new(record_validator.params)
      @import_history.update(record_id: record.id) if record.save
    end
  end
end
