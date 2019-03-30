# frozen_string_literal: true

class Record::CsvRow
  include ActiveModel::Model

  def initialize(record:)
    @record = record
  end

  def self.create(record:)
    new(record: record).create
  end

  def create
    [
      @record.published_date.strftime('%Y-%m-%d'),
      @record.category_name,
      @record.breakdown_name,
      @record.place_name,
      @record.charge,
      @record.memo.presence,
      @record.tag_names.join(',').presence
    ]
  end
end
