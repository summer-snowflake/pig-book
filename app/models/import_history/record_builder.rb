# frozen_string_literal: true

class ImportHistory::RecordBuilder
  attr_accessor :record

  def initialize(user:, row:)
    @user = user
    @row = row
    @error_messages = []
    @record = ImportHistory::Record.new(user: user, row: row.split(','))
  end

  def valid?
    @record.valid?
  end

  def error_messages
    @record.valid? ? [] : @record.errors.full_messages
  end
end
