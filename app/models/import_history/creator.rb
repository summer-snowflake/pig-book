# frozen_string_literal: true

class ImportHistory::Creator
  def initialize(user:, import_history_id:)
    @user = user
    @import_history = @user.import_histories.find(import_history_id)
  end

  def create_record
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

  def create_category
    return unless @import_history.category_required?

    @user.categories.create(name: @import_history.category_name)
  end

  def create_breakdown
    return unless @import_history.breakdown_required?

    category = @user.categories.find(@import_history.category_id)
    category.breakdowns.create(name: @import_history.breakdown_name,
                               category_id: @import_history.category_id)
  end
end
