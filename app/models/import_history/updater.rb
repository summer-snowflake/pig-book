# frozen_string_literal: true

require 'csv'

class ImportHistory::Updater
  attr_reader :updated_ids

  def initialize(user:)
    @user = user
  end

  def import(file:)
    csv_data = CSV.read(file.path)

    csv_data.each do |row|
      next if row.blank?

      @user.import_histories
           .create!(row: row.join(','), messages: error_messages(row))
    end
    true
  rescue ActiveRecord::RecordInvalid => e
    errors[:base] << e.message
    false
  end

  def update(params)
    record = @user.import_histories.find(params[:id])
    record.update!(row: params[:row],
                   messages: error_messages(params[:row].split(',')))
  end

  def rename_rows(before, after)
    records = @user.import_histories.where('row like ?', "%,#{before},%")
    records.each do |record|
      record.update!(row: record.row.gsub(/#{before}/, after))
    end
    @updated_ids = records.pluck(:id)
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
