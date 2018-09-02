# frozen_string_literal: true

require 'csv'

class ImportHistory::Updater
  def initialize(user:)
    @user = user
  end

  def import(file:)
    csv_data = CSV.read(file.path)

    csv_data.each do |row|
      @user.import_histories
           .create!(row: row.join(','), messages: error_messages(row))
    end
    true
  rescue ActiveRecord::RecordInvalid => e
    errors[:base] << e.message
    false
  end

  private

  def error_messages(row)
    builder = ImportHistory::RecordBuilder.new(user: @user, row: row.join(','))
    builder.error_messages.join(' / ')
  end
end
